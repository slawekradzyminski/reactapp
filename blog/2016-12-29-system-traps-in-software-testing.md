---
title: System traps in software testing
layout: post
permalink: /2016/12/system-traps-in-software-testing
categories:
  - Testing thoughts
tags:
  - testing thoughts 
---

![](/images/blog/system.jpg)

I had written several times on this blog that from my perspective majority of testers today lack full Software Engineering Life-Cycle (SDLC) understanding. As a community we should also look at our projects not only through tester's eyes, but also acknowledge stakeholders goals & needs (focusing mostly on customers). In the end our common goal is to make money for the company, not to ship bug-free software. Recently I read gripping book which may help in looking at software engineering from different angle: [Thinking in Systems](https://www.amazon.com/Thinking-Systems-Donella-H-Meadows/dp/1603580557) by Donella H. Meadows. It's not classic book about SDLC, but rather [systems theory](https://en.wikipedia.org/wiki/Systems_theory) primer.

I strongly recommend reading Donella's book and those two blog posts - [Part I](https://medium.com/@Smrimell/it-s-a-trap-systems-traps-in-software-development-dc6341022795#.62m17ayj0), [Part II](https://medium.com/@Smrimell/escape-the-trap-avoiding-traps-in-software-development-with-systems-thinking-cbc20af7c719#.d6nlbrtes) which extend chapter 5 of the book. Having understood those I figured out I would try to show the same traps in software testing. All those examples are based on my personal experience, books, blogs and chats with other testers. All quotes below are from sources listed above.

## Trap 1 - Policy Resistance: separate development teams and testing team

> Otherwise known as 'Fixes that fail', this trap prevents system change due to the conflicting needs of multiple actors in the system.

Imagine you are creating a complicated system which require multiple parts developed by separate teams. You know that integration will be painful, so you decide to create new team responsible for end-to-end system testing. Unfortunately as soon as they start working you realise that most of the integrations don't work and they struggle to pass even the most basic test case. What happened?

By creating separate team you reduced product responsibility from development teams. In such case they were focusing more on meeting deadlines at their end than on common goal - making it work for end customer. You also started waterfall-like process in which teams think only on basic level testing (unit, integration) without E2E perspective. Performance? Let's leave it to system testing team. They will check that.

Worst of all this separate team of testers which now tries to prove it's usefulness by focusing on finding as many bugs a possible without thinking of improving the whole process/product.

I understand that having system testing team is sometimes necessary, but always pay close attention how it cooperates with others.

## Trap 2 - Tragedy on the commons: disposable, temporary tester

> Tragedy of the commons is a systems archetype that describes an escalation in the usage of a common resource, eventually resulting in its depletion and ultimate destruction.

Let's say you don't want to invest too much into quality, so you figure out that your testers would temporarily join projects which require them most. The idea is very alluring, but the results not so much. Developers know that their code would be tested a some point, but they don't think about quality on daily basis. Again, we have waterfall-like process. When something is ready for testing you call Mr. Tester, and he joins the project.

At first, it takes some time for Mr. Tester to read all the documentation and requirements. He then performs manual testing which can't really be called exploratory, because he's application knowledge is nowhere near being expert (those are all basic checks really). Soon he's more familiar with a team and project he's ready to start improve the process and automate test cases. But what happens? He's delegated to different project and everything starts again.

If you ever want to get rid of testers in your organisation this is a way to go. They'll be so demotivated after working in such style that they will leave on first opportunity. Tester is not a commodity.

// ... remaining traps follow same pattern ...
