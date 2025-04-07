import{_ as i,o as t,c as a,e}from"./app-_QQAOW96.js";const n={};function p(l,s){return t(),a("div",null,s[0]||(s[0]=[e(`<p>原型对象本身也是个对象，默认情况下，是通过<code>new Object</code> 创建的。</p><p><img src="https://s21.ax1x.com/2024/06/07/pkYj3ct.png" alt="图片"></p><p><img src="https://s21.ax1x.com/2024/06/07/pkYjJnf.png" alt="图片"></p><p><code>Object.prototype.__proto__</code><strong>比较特殊，他固定指向 null</strong></p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">Object</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">prototype</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">__proto__</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // null</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>可以看出，user 的原型形成了一条链条，称之为原型链</p><p>当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找</p><hr><p><code>Object</code>的隐式原型(<code>Object.__proto__</code>)等于 Function 的原型(Function.prototype)</p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Object</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">__proto__</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ===</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> Function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">prototype</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>原型链</strong></p><p><img src="https://s21.ax1x.com/2024/06/07/pkYjUAg.png" alt="原型链"></p><div class="language-js line-numbers-mode" data-ext="js" data-title="js"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">User</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">__proto__</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ===</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> Function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">prototype</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">Function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">prototype</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">__proto__</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ===</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> Object</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">prototype</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">console</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">Function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">__proto__</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> ===</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;"> Function</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">prototype</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13)]))}const k=i(n,[["render",p],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/article/7tsf7d46/","title":"Js中的原型链-渡一教育","lang":"zh-CN","frontmatter":{"title":"Js中的原型链-渡一教育","createTime":"2024/06/07 08:16:06","permalink":"/article/7tsf7d46/","tags":["原型链"],"description":"原型对象本身也是个对象，默认情况下，是通过new Object 创建的。 图片 图片 Object.prototype.__proto__比较特殊，他固定指向 null 可以看出，user 的原型形成了一条链条，称之为原型链 当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找 Object的隐式原型(Object.__pro...","head":[["meta",{"property":"og:url","content":"https://www.jdynb.xyz/article/7tsf7d46/"}],["meta",{"property":"og:site_name","content":"冬日暖雨"}],["meta",{"property":"og:title","content":"Js中的原型链-渡一教育"}],["meta",{"property":"og:description","content":"原型对象本身也是个对象，默认情况下，是通过new Object 创建的。 图片 图片 Object.prototype.__proto__比较特殊，他固定指向 null 可以看出，user 的原型形成了一条链条，称之为原型链 当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找 Object的隐式原型(Object.__pro..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://s21.ax1x.com/2024/06/07/pkYj3ct.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-17T03:47:21.000Z"}],["meta",{"property":"article:tag","content":"原型链"}],["meta",{"property":"article:modified_time","content":"2024-11-17T03:47:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Js中的原型链-渡一教育\\",\\"image\\":[\\"https://s21.ax1x.com/2024/06/07/pkYj3ct.png\\",\\"https://s21.ax1x.com/2024/06/07/pkYjJnf.png\\",\\"https://s21.ax1x.com/2024/06/07/pkYjUAg.png\\"],\\"dateModified\\":\\"2024-11-17T03:47:21.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":0.57,"words":172},"git":{"createdTime":1731815241000,"updatedTime":1731815241000,"contributors":[{"name":"jdy2002","email":"jiangdongyu54@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"javascript/Js中的原型链-渡一教育.md","categoryList":[{"id":"de9b9e","sort":10004,"name":"javascript"}],"bulletin":false}');export{k as comp,r as data};
