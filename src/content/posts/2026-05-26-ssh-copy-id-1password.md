---
title: Using `ssh-copy-id` with the 1Password SSH agent
---

The [SSH agent][1password-ssh-agent] is one of 1Password's best features but
using it obfuscates things a bit more than I am used to with just files in
`~/.ssh/*.pub`. In particular I was used to being able to `scp` my public key
onto my servers. I was tempted to see if I could get my public key out of the
ssh-agent and pipe it into `ssh` but then I thought "surely there's a better
way..."

And there is! [`ssh-copy-id`][ssh-copy-id] does exactly what I want. All you
have to do is make sure you have `SSH_AUTH_SOCK` set[^1].

`ssh-copy-id` will copy to the target all of the keys currently loaded in the
agent. If you don't want to include everything you might want to consider
updating your [agent config file][agent-config] to only include the key(s) you
want[^2].

Here's how this looks in practice:

```
# list keys currently in the agent
ssh-add -l

# dry run copying the key(s)
ssh-copy-id -l -n user@host

# copy key(s)
ssh-copy-id -l user@host
```

[^1]:
    [Agent configuration with `SSH_AUTH_SOCK` - 1Password
    Developer][ssh-auth-sock]

[^2]:
    There might be a better way to do this but I didn't dig into it much
    because editing the agent configuration was something I was comfortable
    with already.

[1password-ssh-agent]: https://www.1password.dev/ssh/agent
[ssh-copy-id]: https://man.freebsd.org/cgi/man.cgi?query=ssh-copy-id&apropos=0&sektion=0&manpath=FreeBSD+15.0-RELEASE&format=ascii
[agent-config]: https://www.1password.dev/ssh/agent/config
[ssh-auth-sock]: https://www.1password.dev/ssh/agent/compatibility#agent-configuration-with-ssh_auth_sock
