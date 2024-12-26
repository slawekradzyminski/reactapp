---
title: How to Download files using Selenium 2
layout: post
permalink: /2016/06/how-to-download-files-using-selenium-2
categories:
  - Selenium
tags:
  - selenium
  - testing
  - fluentlenium
  - test automation
  - UI testing 
---

![](/images/blog/downloading-001.png)

In my previous post about [Selenium](http://awesome-testing.blogspot.com/2016/02/selenium-browser-capabilities-explained.html), I explained how can we modify browsers before tests to have the desired configuration. Today I like to discuss a different topic that lacks quality guides - downloading files. Mixing Selenium with AutoIT isn't good, trust me.

I'm using [FluentLenium](http://awesome-testing.blogspot.com/2016/01/introducing-fluentlenium-1.html) syntax to navigate on the page (that would be Micheal Bolton's [homepage](http://www.developsense.com/) to be more precise), but it's very intuitive, and you shouldn't have any problems rewriting it on Selenium. I borrowed some code from [Mastering Selenium WebDriver](http://www.amazon.com/Mastering-Selenium-WebDriver-Mark-Collin/dp/1784394351) book, which I once again recommend.

Testers who don't understand HTTP protocol usually get stuck with 'Are you sure you want to download this file?' popup. The thing is, it's just internal browser implementation and we don't have to test it. We are going to bypass it completely. I'll give you 4 examples of how can you test it. Make a risk assessment and decide which one would be appropriate for your site. The first one is the fastest, and the last one is the slowest.

## Checking that file is available on given address

We will not only bypass the browser's download handling mechanism, but we won't use Selenium too. It's just [HttpClient](https://hc.apache.org/httpcomponents-client-ga/tutorial/pdf/httpclient-tutorial.pdf) request and response code verification (we expect 200 -> SC_OK). We don't verify that the user sees the link and can click on it.

{% highlight java %}
    @Test
    public void downloadNoSelenium() throws URISyntaxException, IOException {
        Request request = new Request();
        String linkToCheck = "http://www.developsense.com/courses/RapidSoftwareTesting.pdf";
        request.setURIToCheck(linkToCheck);
        assertThat(request.getHTTPStatusCodeFromResponse()).isEqualTo(SC_OK);
    }
{% endhighlight %}

And here is HttpClient implementation. Quite a few lines, I know.

{% highlight java %}
// ... existing code ...
{% endhighlight %}

## Checking that file is available for real user

Now we would simulate the real user. We are going to get a URL from the existing site selector and add user cookies to HTTP requests. Note that only getUrlFromSite() method uses FluentLenium. That's the class you need to modify to make it work in clean Selenium.

{% highlight java %}
// ... existing code ...
{% endhighlight %}

##  Checking that file isn't empty

Now we would download the file and check that it isn't empty. Have in mind that this approach applies to small files.

{% highlight java %}
// ... existing code ...
{% endhighlight %}

## Checking that we download the correct file

And finally the most reliable approach. We would not only download the file but also check it's md5 checksum.

{% highlight java %}
// ... existing code ...
{% endhighlight %}
