import{_ as i,o as a,c as e,e as n}from"./app-_QQAOW96.js";const l={};function t(p,s){return a(),e("div",null,s[0]||(s[0]=[n(`<h2 id="内存" tabindex="-1"><a class="header-anchor" href="#内存"><span>内存</span></a></h2><p>查看内存容量</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">free</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="虚拟内存" tabindex="-1"><a class="header-anchor" href="#虚拟内存"><span>虚拟内存</span></a></h3><p>配置虚拟内存</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 选择虚拟内存创建位置</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">mkdir</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swap</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">  #新建文件夹</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swap</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># bs 为块的大小，count 创建多少个块 这里创建2gb</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> dd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> if=/dev/zero</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> of=swapfile</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> bs=1M</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> count=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2048</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 修改权限</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> chmod</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0600</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swapfile</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">#把生成的文件转换成 Swap 文件</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> mkswap</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swapfile</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 激活文件</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swapon</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swapfile</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>释放虚拟内存</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 执行命令后，删除创建的swap目录即可</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swapoff</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swapfile</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>开启自启，自动使用虚拟内存</p><div class="language-bash line-numbers-mode" data-ext="bash" data-title="bash"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 此时开的虚拟内存会在开机后消失,如果永久保持下去,</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 在/etc/fstab文件尾添加一下信息(没有文件则创建):</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">swapfilepath</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swap</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swap</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> defaults</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 例如:我的我是在/root/进行的配置,因此添加了下面内容</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">/data/swap/swapfile</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swap</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> swap</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;"> defaults</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"># 保存并退出即可</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>虚拟内存相较于物理内存，读写速度慢，且占用物理内存</p></div>`,11)]))}const h=i(l,[["render",t],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/memo/linux/","title":"Linux常用指令","lang":"zh-CN","frontmatter":{"title":"Linux常用指令","createTime":"2024/11/22 22:05:45","permalink":"/memo/linux/","description":"内存 查看内存容量 虚拟内存 配置虚拟内存 释放虚拟内存 开启自启，自动使用虚拟内存 注意 虚拟内存相较于物理内存，读写速度慢，且占用物理内存","head":[["meta",{"property":"og:url","content":"https://www.jdynb.xyz/memo/linux/"}],["meta",{"property":"og:site_name","content":"冬日暖雨"}],["meta",{"property":"og:title","content":"Linux常用指令"}],["meta",{"property":"og:description","content":"内存 查看内存容量 虚拟内存 配置虚拟内存 释放虚拟内存 开启自启，自动使用虚拟内存 注意 虚拟内存相较于物理内存，读写速度慢，且占用物理内存"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-24T03:11:44.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-24T03:11:44.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Linux常用指令\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-24T03:11:44.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"内存","slug":"内存","link":"#内存","children":[{"level":3,"title":"虚拟内存","slug":"虚拟内存","link":"#虚拟内存","children":[]}]}],"readingTime":{"minutes":0.85,"words":255},"git":{"createdTime":1732417904000,"updatedTime":1732417904000,"contributors":[{"name":"Yu2002s","email":"jiangdongyu54@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/memo/linux/README.md","bulletin":false}');export{h as comp,r as data};
