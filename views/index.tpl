{%extends file='file:./common/base.tpl'%}
{%block name="title"%}<title>首页</title>{%/block%}
{%block name="css"%}
<link href="/src/index.less" rel="stylesheet">
{%/block%}
{%block name="main"%}
<div id="main">
    <p>My name is {%$tplData.name%}, I'm from {%$tplData.country%}.</p>
</div>
{%/block%}
{%block name="footer-script"%}
<script>
    require(['main'], function (main) {
        main.init();
    });
</script>
{%/block%}
