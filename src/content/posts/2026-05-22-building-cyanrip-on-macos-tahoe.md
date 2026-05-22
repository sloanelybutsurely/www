---
title: Building cyanrip on macOS Tahoe
---

This guide assumes you have [brew] installed already.

### Install dependencies with brew

```sh
brew install meson cmake ffmpeg pkgconf \
             curl libcdio libcdio-paranoia \
             libmusicbrainz
```

### Download and extract source

Check the [cyanrip releases page][releases] and download the
`cyanrip-src-vX.X.X-tar.gz` file for the latest release. At time of writing the
latest release is `v0.9.3.1`.

```sh
mkdir cyanrip
cd cyanrip
# assuming you have wget...
wget https://github.com/cyanreg/cyanrip/releases/download/v0.9.3.1/cyanrip-src-v0.9.3.1.tar.gz
tar xf cyanrip-src-v0.9.3.1.tar.gz
```

### Build and install

https://github.com/cyanreg/cyanrip#compiling

```sh
meson build
ninja -C build
sudo ninja -C build install
```

### Enjoy!

```sh
$ cyanrip -V
cyanrip 0.9.3 (release)
```

---

Having issues? Shoot me an [email] and I'll try my best to help.

[brew]: https://brew.sh
[releases]: https://github.com/cyanreg/cyanrip/releases
[email]: mailto:sloane@sloanelybutsurely.com
