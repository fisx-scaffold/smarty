<?php
ini_set('date.timezone', 'Europe/Berlin');
$project_root = dirname(dirname(__FILE__));

error_reporting(0);
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('error_reporting', E_ALL & ~E_NOTICE);
// ini_set('display_errors', 'On');

require dirname(__FILE__) . '/libs/Smarty.class.php';

$smarty = new Smarty();

$smarty -> force_compile = true;
$smarty -> debugging = false;
$smarty -> caching = false;
// $smarty -> cache_lifetime = 120;

$smarty -> left_delimiter  = '{%';
$smarty -> right_delimiter = '%}';

$releaseFlag = $_SERVER['HTTP_FISX_RELEASE'];
if (isset($releaseFlag) && $releaseFlag) {
    $suffix = '/output';
} else {
    $suffix = '';
}

$smarty -> assign('host', 'http://' . $_SERVER['SERVER_NAME'] . ':8848');

// 设置模版和模板编译输出目录
$smarty -> setTemplateDir($project_root . $suffix . '/views/');
$smarty -> setCompileDir($project_root . '/views_c/');
