import{_ as i,o as a,c as n,e}from"./app-yTfnLudQ.js";const l={};function t(h,s){return a(),n("div",null,s[0]||(s[0]=[e(`<h4 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖"><span>防抖</span></a></h4><p>触发高频事件后 n 秒内，函数只会执行最后一次，如果 n 秒内高频事件再次被触发，则重新计算时间。</p><p>使用场景：搜索框、登录、注册、发送验证码按钮</p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 防抖</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> debounce</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cb</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  // 使用闭包特性设置初始值</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">  let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> timer</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> undefined</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  // 返回一个新函数出去</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">  return</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 每当用户输入的时候，把之前的定时器清除，让用户输入的间隔时间大于500ms</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    clearTimeout</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">timer</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 延迟500ms调用</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    timer</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> setTimeout</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">      // 调用传入的会掉函数</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">      cb</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apply</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> arguments</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    },</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 500</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="节流" tabindex="-1"><a class="header-anchor" href="#节流"><span>节流</span></a></h4><p>触发高频事件后 n 秒内只会执行一次，节流会稀释函数的执行频率</p><p>使用场景：滚动、移动事件</p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 节流</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> throttle</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">cb</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  // 设置一个标志记录状态</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">  let</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> flag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">  return</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> ()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 判断状态，如果为true则执行</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    if</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">!</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">flag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> return</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 设置状态为false，防止多次调用</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    flag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> false</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">    // 设置定时器，只有过了500ms时，flag设置为true，才能再次执行</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">    setTimeout</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">      cb</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">apply</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> arguments</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">      flag</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> true</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    },</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 500</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8)]))}const k=i(l,[["render",t],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/2m7yfuhn/","title":"节流和防抖实现和原理","lang":"zh-CN","frontmatter":{"title":"节流和防抖实现和原理","createTime":"2024/06/06 13:46:25","permalink":"/article/2m7yfuhn/","tags":["性能优化"],"description":"防抖 触发高频事件后 n 秒内，函数只会执行最后一次，如果 n 秒内高频事件再次被触发，则重新计算时间。 使用场景：搜索框、登录、注册、发送验证码按钮 节流 触发高频事件后 n 秒内只会执行一次，节流会稀释函数的执行频率 使用场景：滚动、移动事件","head":[["meta",{"property":"og:url","content":"https://www.jdynb.xyz/article/2m7yfuhn/"}],["meta",{"property":"og:site_name","content":"冬日暖雨"}],["meta",{"property":"og:title","content":"节流和防抖实现和原理"}],["meta",{"property":"og:description","content":"防抖 触发高频事件后 n 秒内，函数只会执行最后一次，如果 n 秒内高频事件再次被触发，则重新计算时间。 使用场景：搜索框、登录、注册、发送验证码按钮 节流 触发高频事件后 n 秒内只会执行一次，节流会稀释函数的执行频率 使用场景：滚动、移动事件"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-17T03:47:21.000Z"}],["meta",{"property":"article:tag","content":"性能优化"}],["meta",{"property":"article:modified_time","content":"2024-11-17T03:47:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"节流和防抖实现和原理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-17T03:47:21.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":0.99,"words":297},"git":{"createdTime":1731815241000,"updatedTime":1731815241000,"contributors":[{"name":"jdy2002","email":"jiangdongyu54@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"javascript/节流和防抖实现和原理.md","categoryList":[{"id":"de9b9e","sort":10003,"name":"javascript"}],"bulletin":false}');export{k as comp,r as data};