---
title: Test Page
---

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

A simple, short paragraph demonstrating how normal text looks. It includes things like **bold text**, _italic text_, ~~strike through~~, and `inline code`.

{% highlight elixir %}
defmodule BlogWeb.PostController do
  use BlogWeb, :controller

  def show(conn, %{"post_id" => post_id}) do
    if post = Blog.Posts.get(post_id) do
      render(conn, "blog", blog: blog)
    else
      conn
      |> put_status(:not_found)
      |> render("404")
    end
  end
end
{% endhighlight %}

There are also things like...

> Block quotes which look like this

Or [links](https://wikipedia.org) and footnotes[^1]

[^1]: And footnote content looks like this
