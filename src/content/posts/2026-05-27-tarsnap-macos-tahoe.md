---
title: Installing tarsnap on macOS Tahoe
---

## Installing `tarsnap` client

Use [homebrew](https://brew.sh)

```sh
brew install tarsnap
```

## Creating `/root`

Since macOS 10.15 the root file-system is read-only. To create directories in
`/` you must add them to `/etc/synthetic.conf` which will create a symlink from
`/` at boot. See `synthetic.conf(5)` (`man synthetic.conf`) for more info.


### Create the directory and set permissions

Things like `var`, `etc`, and `tmp` all actually exist in `/private` so let's
copy that pattern.

```sh
sudo mkdir /private/root
```

`/root` should belong to root and readable and writable **only** to root.

```sh
sudo chown root /private/root
sudo chmod 0600 /private/root
```

### Update `/etc/synthetic.conf`

Only root can edit `/etc/synthetic.conf` so do that however you like. I use
`sudo nvim /etc/synthetic.conf`.

**IMPORTANT:** there must be a **TAB** character between `root` and
`private/root`. If you're using (neo)vim and have expandtab set you'll have to
use `<C-v><TAB>` to do that.

```sh
# /etc/synthetic.conf
root	private/root
```

### Reboot and verify

Once you've restarted you should see the new directory:

```sh
ls -la

total 10
drwxr-xr-x  22 root  wheel   704 Feb 24 22:41 .
drwxr-xr-x  22 root  wheel   704 Feb 24 22:41 ..
# ...
lrwxr-xr-x   1 root  wheel    12 May 27 16:09 root -> private/root
```

Alternatively you can use `apfs.util` to create the root mounts without a
reboot:

```sh
sudo /System/Library/Filesystems/apfs.fs/Contents/Resources/apfs.util -t
```

See `apfs.util(8)`.

(Permissions look wrong in `/` but that's just because the symlink has those
permissions. The actual directory in `/private/root` has the correct
permissions and behaves correctly.)

## Create a key

Because we are keeping our key in `/root` we must use `sudo` for any tarsnap
command that references the keyfile.

```sh
sudo tarsnap-keygen --keyfile /root/tarsnap.key --user <tarsnap email> --machine <desired key/machine name> 
```

## Create an archive

You now have [tarsnap] installed and configured with a local machine key.

```sh
# test creating an archive
sudo tarsnap -c -f <some archive name> <some path>
```


[tarsnap]: https://tarsnap.com
