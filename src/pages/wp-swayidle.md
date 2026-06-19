---
layout: ../layouts/MDLayout.astro
title: 'wp-swayidle - swayidle manager'
---

# wp-swayidle

[![builds.sr.ht status](https://builds.sr.ht/~lucaz/wp-swayidle.svg)](https://builds.sr.ht/~lucaz/wp-swayidle?)

A program that manages swayidle depending on audio output.

If any active stream is detected, swayidle will be stopped, if not, swayidle
will be re-spawned. Only the swayidle instance spawned by wp-swayidle will be
stopped.

Originally, I wrote this program because it's hard to pause swayidle on all the
occasions that I do not want my screen suddenly been locked, like when I am
watching a video in a browser that is not in fullscreen, playing games that are
not listed in the `for_window` rules in Sway, or just listening to music hosted
by `mpd`. By just checking if there is any audio output, almost all the
occasions are covered.

## Usage

    wp-swayidle <interval> [-- <swayidle args>...]

For example in `~/.config/sway/config`:

    exec swayidle -w before-sleep 'swaylock'
    exec wp-swayidle 3 -- timeout 300 'swaylock' \
                          timeout 600 'swaymsg "output * power off"' \
                          resume 'swaymsg "output * power on"'

The first swayidle instance will keep running so that swaylock will always be
triggered before sleeping, and the second will be killed when audio output is
detected, as well as spawned when nothing is playing.

## Download

- [The source at SourceHut](https://sr.ht/~lucaz/wp-swayidle)
- [The source at GitHub](https://github.com/vollowx/wp-swayidle)
