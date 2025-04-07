import{_ as s,o as e,c as a,e as n}from"./app-_QQAOW96.js";const t={};function l(r,i){return e(),a("div",null,i[0]||(i[0]=[n(`<p>BRV 为快速构建 RV 列表工具, 以开源分享来完善, 将一直保持社区维护</p><p><a href="https://liangjingkanji.github.io/BRV/index.html" target="_blank" rel="noopener noreferrer">文档地址</a> <a href="https://github.com/liangjingkanji/BRV" target="_blank" rel="noopener noreferrer">GITHUB</a></p><p>简单语法</p><div class="language-kotlin line-numbers-mode" data-ext="kotlin" data-title="kotlin"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">class</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> BrvActivity</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">AppCompatActivity</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">() {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    override</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> fun</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> onCreate</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(savedInstanceState: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">Bundle</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">?) {</span></span>
<span class="line"><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">        super</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">onCreate</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(savedInstanceState)</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        val</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> binding </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> ActivityBrvBinding.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">inflate</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(layoutInflater)</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">        setContentView</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(binding.root)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        val</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> rv </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> binding.rv</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        rv.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">linear</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">setup</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> {}</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    }</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]))}const h=s(t,[["render",l],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/article/ipx72c5c/","title":"Android RecyclerView增强依赖-BRV","lang":"zh-CN","frontmatter":{"title":"Android RecyclerView增强依赖-BRV","createTime":"2024/08/31 17:43:56","permalink":"/article/ipx72c5c/","tags":["RecyclerView"],"description":"BRV 为快速构建 RV 列表工具, 以开源分享来完善, 将一直保持社区维护 文档地址 GITHUB 简单语法","head":[["meta",{"property":"og:url","content":"https://www.jdynb.xyz/article/ipx72c5c/"}],["meta",{"property":"og:site_name","content":"冬日暖雨"}],["meta",{"property":"og:title","content":"Android RecyclerView增强依赖-BRV"}],["meta",{"property":"og:description","content":"BRV 为快速构建 RV 列表工具, 以开源分享来完善, 将一直保持社区维护 文档地址 GITHUB 简单语法"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-17T03:47:21.000Z"}],["meta",{"property":"article:tag","content":"RecyclerView"}],["meta",{"property":"article:modified_time","content":"2024-11-17T03:47:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Android RecyclerView增强依赖-BRV\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-17T03:47:21.000Z\\",\\"author\\":[]}"]]},"headers":[],"readingTime":{"minutes":0.27,"words":81},"git":{"createdTime":1731815241000,"updatedTime":1731815241000,"contributors":[{"name":"jdy2002","email":"jiangdongyu54@gmail.com","commits":1}]},"autoDesc":true,"filePathRelative":"android/Android RecyclerView增强依赖-BRV.md","categoryList":[{"id":"c31b32","sort":10002,"name":"android"}],"bulletin":false}');export{h as comp,d as data};
