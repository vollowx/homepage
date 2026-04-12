---
layout: ../../layouts/MDBlogLayout.astro
title: 'Writing a DNS Relsover in D'
pubDate: 2026-04-11
description: 'Learning D...'
tags: ['d', 'network']
---

Recently I've got to know the D programming language from [Tsoding](https://www.youtube.com/@TsodingDaily)'s
previous sessions, and I really liked its language features like baked in
string type and operations, array operations and so on. So how do we learn a
language? Surely, we're going to write a toy project with it!

## Before It Begins

- Homepage: https://dlang.org/
- What is a [DNS resolver](https://en.wikipedia.org/wiki/Domain_Name_System#DNS_resolvers)
- Related IETF docs:
  - [DOMAIN NAMES - CONCEPTS AND FACILITIES](https://datatracker.ietf.org/doc/html/rfc1034)
  - [DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION](https://datatracker.ietf.org/doc/html/rfc1035)
  - [Clarifications to the DNS Specification](https://datatracker.ietf.org/doc/html/rfc2181)

## Defining the Structs

DNS packets aren't just strings, they are packed binary data. Every DNS request
starts with a 12-byte header according to IETF[^1].

In D, we use a `struct` to map this structure, with the `align(1)` to ensure
that no padding bytes are being added by the compiler.

```d
import std.stdio;

align(1) struct DNSHeader {
  ushort id;
  ushort flags;
  ushort qdcount; // questions
  ushort ancount; // answers
  ushort nscount; // authority records
  ushort arcount; // additional records
}

void main() {
  writeln("DNS header size = ", DNSHeader.sizeof, " bytes");
  // --> DNS header size = 12 bytes
}
```

[^1]: DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION (Section 4.1.1) https://datatracker.ietf.org/doc/html/rfc1035#autoid-41

## Encoding the Domain

In DNS, labels are used instead of a full domain. For example, `www.google.com`
becomes `[3] 'w' 'w' 'w' [6] 'g' 'o' 'o' 'g' 'l' 'e' [3] 'c' 'o' 'm' [0]`. Each
segmentation of the domain is started with its length, and a `[0]` is added at
the end.

We'll write a helper function to convert from a regular domain to such format,
and that's where `appender` and `std.array` of D come to help.

```d
import std.array;

ubyte[] encodeDomain(string domain) {
  auto buffer = appender!(ubyte [])();
  auto parts = domain.split(".");

  foreach (part; parts) {
    buffer.put(cast(ubyte) part.length);
    foreach (char c; part) {
      buffer.put(cast(ubyte) c);
    }
  }
  buffer.put(cast(ubyte) 0);

  return buffer.data;
}
```

## Assembling the Full Packet

A DNS query consists of the header, the encoded name, the type (like A, AAAA,
MX), and the class (usually IN for Internet).

Also, we need to ensure that our numbers are in [Big Endian](https://en.wikipedia.org/wiki/Endianness),
D provides `nativeToBigEndian` in `std.bitmanip` for such convertion.

```d
import std.bitmanip;

align(1) struct DNSHeader {
  // ...

  ubyte[] encode() const {
    ubyte[] buffer;
    buffer.length = 12;
    size_t offset = 0;

    buffer.write!(ushort, Endian.bigEndian)(id,      &offset);
    buffer.write!(ushort, Endian.bigEndian)(flags,   &offset);
    buffer.write!(ushort, Endian.bigEndian)(qdcount, &offset);
    buffer.write!(ushort, Endian.bigEndian)(ancount, &offset);
    buffer.write!(ushort, Endian.bigEndian)(nscount, &offset);
    buffer.write!(ushort, Endian.bigEndian)(arcount, &offset);

    return buffer;
  }
}

void main() {
  DNSHeader header;
  header.id      = 0x1234;
  header.flags   = 0x0100;
  header.qdcount = 1;
  auto encodedHeader = header.encode();

  string target = "google.com";
  auto encodedDomain = encodeDomain(target);

  // 4 bytes needed after the name, 2 for both
  ushort qtype = 1;  // A record for 1
  ushort qclass = 1; // IN       for 1

  ubyte[] packet;
  packet ~= encodedHeader;
  packet ~= encodedDomain;
  packet ~= nativeToBigEndian(qtype);
  packet ~= nativeToBigEndian(qclass);
}
```

## Send and Pray

DNS usually uses UDP since it's fast and a persistent connection using
protocols like TCP is not needed. The `std.socket` module will be used.

Since UDP is a "send and forget" protocol, we send out packet and then
immediately block to listen for response.

```d
void main() {
  // ...

  auto socket = new UdpSocket();
  auto address = new InternetAddress("8.8.8.8", 53);

  socket.sendTo(packet, address);
  writeln("Query send, waiting for response...");

  ubyte[512] recvBuf;
  auto received = socket.receiveFrom(recvBuf);

  if (received > 0) {
    writeln("Received ", received, " bytes");
    // --> Received 44 bytes
  }
}
```

You might be curious about the magic number 512 for `recvBuf`, and it is
explained in here[^2].

Note that is the response is shorter than 12 bytes, it is probably a invalid
response, there might be some problems with the format, network, etc.

[^2]: DOMAIN NAMES - IMPLEMENTATION AND SPECIFICATION (Section 4.2.1) https://datatracker.ietf.org/doc/html/rfc1035#autoid-46

## Parsing the Response

First we decode the first 12 bytes of the response to get a `DNSHeader` struct
to better deal with it.

```d
align(1) struct DNSHeader {
  // ...

  static DNSHeader decode(const ubyte[] data) {
    if (data.length < 12) throw new Exception("Buffer is too small for header");

    DNSHeader h;
    size_t offset = 0;

    h.id      = peek!(ushort, Endian.bigEndian)(data, offset); offset += 2;
    h.flags   = peek!(ushort, Endian.bigEndian)(data, offset); offset += 2;
    h.qdcount = peek!(ushort, Endian.bigEndian)(data, offset); offset += 2;
    h.ancount = peek!(ushort, Endian.bigEndian)(data, offset); offset += 2;
    h.nscount = peek!(ushort, Endian.bigEndian)(data, offset); offset += 2;
    h.arcount = peek!(ushort, Endian.bigEndian)(data, offset); offset += 2;

    return h;
  }
}

int main() {
  // ...

  if (received < DNSHeader.sizeof) {
    writeln("Invalid response.");
    return 128;
  }

  writeln("Got ", received, " bytes.");

  auto respHeader = DNSHeader.decode(recvBuf[0 .. 12]);
  int rcode = respHeader.flags & 0x000F;
  writefln("id = 0x%X, answers = %d, rcode = %d",
           respHeader.id,
           respHeader.ancount,
           rcode);

  // --> Query send, waiting for response...
  //     Got 44 bytes.
  //     id = 0x1234, answers = 1, rcode = 0

  return 0;
}
```

Since we can see one answer given, let's parse it. We don't really know where
each part of the response is, so `offset` is used to "walk over" and check the
response part by part.

```d
int main() {
  // ...

  if (rcode != 0 || respHeader.ancount == 0) {
    writeln("Error or no answers received.");
    return 1;
  }

  size_t offset = 12;

  while (recvBuf[offset] != 0) {
    offset += recvBuf[offset] + 1;
  } //            Skip question
  offset += 1; // Skip QTYPE
  offset += 4; // Skip QCLASS

  for (int i = 0; i < respHeader.ancount; ++i) {
    // Check for name compression, 11 in binary which is 0xC0
    if ((recvBuf[offset] & 0xC0) == 0xC0) {
      offset += 2;
    } else {
      // Skip the question (domain) label by label
      // 6 g o o g l e 3 c o m 0
      while (recvBuf[offset] != 0)
        offset += recvBuf[offset] + 1;
      offset += 1;
    }

    ushort rType   = peek!(ushort, Endian.bigEndian)(recvBuf[], offset); offset += 2;
    ushort rClass  = peek!(ushort, Endian.bigEndian)(recvBuf[], offset); offset += 2;
    uint   rTtl    = peek!(uint,   Endian.bigEndian)(recvBuf[], offset); offset += 4;
    ushort rLength = peek!(ushort, Endian.bigEndian)(recvBuf[], offset); offset += 2;

    // Type 1 is an A Record (IPv4) and length should be 4 bytes.
    if (rType == 1 && rLength == 4) {
      writefln("Found answer: %d.%d.%d.%d (TTL: %ds)", 
        recvBuf[offset],
        recvBuf[offset+1],
        recvBuf[offset+2],
        recvBuf[offset+3],
        rTtl);
    }

    // Jump to the next answer (if there are)
    offset += rLength;
  }

  // --> Query send, waiting for response...
  //     Got 44 bytes.
  //     id = 0x1234, answers = 1, rcode = 0
  //     Found answer: 142.250.196.206 (TTL: 227s)

  return 0;
}
```

Looks like we've successfully got the IPv4 address of Google!

## Outro

Definately not a long time using D, but for now, D feels like a better C with
a lot of helpers in its standard library, or a C++ with simpler and more
consistent syntax. With D, you get a really powerful standard library, while you
still have the low-level controls on you code like `align(1)` and memory access.

In general, D feels like a language that actually wants you to get things done.
It doesn't hide the hardware from you, but also it doesn't make you "reinvent
the wheel", or not even look for a present solution.

You can find the full code at [vollowx/resolved](https://github.com/vollowx/resolved).
