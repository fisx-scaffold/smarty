<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    {%block name="description"%}
    <meta name="description" content="">
    {%/block%}
    {%block name="data-define"%}{%/block%}
    {%block name="title"%}{%/block%}
    {%block name="css"%}{%/block%}
    {%block name="header-script"%}{%/block%}
</head>
<body>
{%block name="main"%}{%/block%}
{%block name="footer"%}
{%include file='./footer.tpl'%}
{%/block%}
{%block name='footer-base-script'%}{%include file='./script.tpl'%}{%/block%}
{%block name="footer-script"%}{%/block%}
</body>
</html>
