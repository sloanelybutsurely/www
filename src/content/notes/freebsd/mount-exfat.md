---
title: "FreeBSD: Mounting exFAT drive"
---

## Mounting an existing drive

### fuse

Mounting an exFAT drive requires fuse and `fusefs-exfat`

```sh
doas pkg install fusefs-exfat
```

The fuse kernel module must be loaded if it isn't already

```sh
doas kldload fusefs
```

### Identify the drive

```sh
doas geom disk list
```

### Create mount point and mount

```sh
doas mkdir -p /mnt/usb
doas mount.exfat /dev/da0 /mnt/usb
```

## Formatting a drive

**NOTE:** All data on the drive will be lost.

### Required package

`mkexfatfs` is included in `exfat-utils`

```sh
doas pkg install exfat-utils
```

### Formatting

The drive must be unmounted to start.

```sh
doas mkexfatfs /dev/da0
```
