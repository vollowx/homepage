---
layout: ../../layouts/MDBlogLayout.astro
title: 'Configuring Local-based neomutt'
pubDate: 2025-07-26
description: 'So that we can choose to access the emails without Internet connection.'
image:
  url: 'https://docs.astro.build/assets/rose.webp'
  alt: 'The Astro logo on a dark background with a pink glow.'
tags: ['neomutt', 'email', 'unix-like-tools']
---

Nowadays almost all email providers are using applications on mobile devices and
websites/applications on computers, but on Linux, what we can choose are mostly
websites. However, what if we want to access our emails when we're not connected
to the Internet? It is not quite reasonable that we can only read emails through
the websites or apps provided. So, is there a minimal tool that run in
terminals, and also accepts local emails? Is there a minimal cli tool that
synchronizes emails both-way from cloud to local and from local to cloud? Here
comes the `neomutt` and `mbsync`.

_Note that all the instructions below are for Outlook._

## Before We Can Configure Anything

Some of the email providers asks for using OAuth to get the IMAP password, so
another script is needed: `mutt_oauth2.py`. `mutt_oauth2.py` is provided by
`neomutt` the package, usually located at
`/usr/share/neomutt/oauth2/mutt_oauth2.py`.

```
$ /usr/share/neomutt/oauth2/mutt_oauth2.py -h
usage: mutt_oauth2.py [-h] [-v] [-d] [-a] [--authflow AUTHFLOW] [--format {token,sasl,msasl}] [--protocol {imap,pop,smtp}] [-t] [--decryption-pipe DECRYPTION_PIPE] [--encryption-pipe ENCRYPTION_PIPE] [--client-id CLIENT_ID]
                      [--client-secret CLIENT_SECRET] [--provider {google,microsoft}] [--email EMAIL]
                      tokenfile

positional arguments:
  tokenfile             persistent token storage

options:
  -h, --help            show this help message and exit
  -v, --verbose         increase verbosity
  -d, --debug           enable debug output
  -a, --authorize       manually authorize new tokens
  --authflow AUTHFLOW   authcode | localhostauthcode | devicecode
  --format {token,sasl,msasl}
                        output format: token - plain access token (default); sasl - base64 encoded SASL token string for the specified protocol [--protocol] and user [--email]; msasl - like sasl, preceeded with the SASL method
  --protocol {imap,pop,smtp}
                        protocol used for SASL output (default: imap)
  -t, --test            test IMAP/POP/SMTP endpoints
  --decryption-pipe DECRYPTION_PIPE
                        decryption command (string), reads from stdin and writes to stdout, default: "gpg --decrypt"
  --encryption-pipe ENCRYPTION_PIPE
                        encryption command (string), reads from stdin and writes to stdout, suggested: "gpg --encrypt --default-recipient-self"
  --client-id CLIENT_ID
                        Provider id from registration
  --client-secret CLIENT_SECRET
                        (optional) Provider secret from registration
  --provider {google,microsoft}
                        Specify provider to use.
  --email EMAIL         Your email address.

This script obtains and prints a valid OAuth2 access token. State is maintained in an encrypted TOKENFILE. Run with "--verbose --authorize --encryption-pipe 'foo@bar.org'" to get started or whenever all tokens have expired, optionally with "--
authflow" to override the default authorization flow. To truly start over from scratch, first delete TOKENFILE. Use "--verbose --test" to test the IMAP/POP/SMTP endpoints.
```

Checking its help manual we can see that, this script accepts several email
providers, email protocols and formats, and the encryption/decryption pipeline.
What we need in this case is to run

```sh
/usr/share/neomutt/oauth2/mutt_oauth2.py -av --encryption-pipe "gpg --encrypt --default-recipient-self" ~/.cache/mutt/oauth-account1
```

You can see that we choose to manually authorize new tokens, `-v` so that we
get more detailed outputs, applied the recommended encryption pipeline, and
finally output the token file to `~/.cache/mutt/oauth-account1`.

When the script asks for client ID, we use the client ID of Thunderbird:
`9e5f94bc-e8a4-4e73-b8be-63364c29d753`.

After this script finishes, we get our token file in place.

## Tasting neomutt with Emails Online

```
# ~/.config/mutt/muttrc

source "~/.config/mutt/account1"
```

```
# ~/.config/mutt/account1

set from = "<email_address>"
set realname = "<your_name>"

set imap_user = "$from"
set imap_authenticators = "xoauth2"
set imap_oauth_refresh_command = "/usr/share/neomutt/oauth2/mutt_oauth2.py ~/.cache/mutt/oauth-account1"

set smtp_authenticators = "$imap_authenticators"
set smtp_oauth_refresh_command = "$imap_oauth_refresh_command"
set smtp_url = "smtp://$imap_user@smtp.office365.com:587"

set ssl_force_tls = yes
set ssl_starttls = yes

###

set folder = "imap://outlook.office365.com"
set spoolfile = "+INBOX"
```

You can see that for the `imap_oauth_refresh_command` and
`smtp_oauth_refresh_command`, we are running that script in a different way,
that is to get the IMAP/SMTP password out through the token file. Note that you
might be prompted to input the GPG paraphrase when `neomutt` is fetching
emails.

```sh
neomutt
```

## Keep Them Locally

Now we can make use of the other tool, `mbsync`. On Arch Linux, the package
name is `isync`, so please check this before installing.

```
# ~/.config/isyncrc

IMAPAccount account1
Host outlook.office365.com
Port 993
User <email_address>
PassCmd "/usr/share/neomutt/oauth2/mutt_oauth2.py ~/.cache/mutt/oauth-account1 -t"
TLSType IMAPS
AuthMechs XOAUTH2

IMAPStore account1-remote
Account account1

MaildirStore account1-local
Path ~/Documents/Mail/account1/
Inbox ~/Documents/Mail/account1/INBOX/
SubFolders Verbatim

Channel account1
Far :account1-remote:
Near :account1-local:
Patterns *
Expunge both
CopyArrivalDate yes
Create both
Sync All
SyncState *
```

With this configuration, `mbsync` will store/read mails from
`~/Documents/Mails/`, authenticate through `mutt_oauth2.py`, and sync mails
both-way. You can run `mbsync account1` to sync explictly account1 or run
`mbsync -a` to sync all your accounts.

Before you run `neomutt` again, there're some changes
you need to apply to its config file.

```
# ~/.config/mutt/account1

...

###

set folder = "~/Documents/Mail/account1" # neomutt now read mails from this folder
unmailboxes *
mailboxes "=INBOX" "=Drafts" "=Sent" "=Junk" "=Deleted" "=Archive"
set spoolfile = "+INBOX"
set trash = "+Deleted"
set postponed = "+Drafts"
```

If you have already done `mbsync -a`, you should be able to check all your
emails after you enter `neomutt`. Congratulations!

Furthermore, you can use some tool to run `mbsync -a` every 20 minutes to keep
your local emails updated. Also, `neomutt` is a very customizable TUI email
client, you can run `man 5 neomuttrc` to custromize its layout, colorscheme and
key-bindings to make it easy to use for you. Here are also some resources for
reference:

- [Mutt - ArchWiki](https://wiki.archlinux.org/title/Mutt)
- [Isync - ArchWiki](https://wiki.archlinux.org/title/Isync)
