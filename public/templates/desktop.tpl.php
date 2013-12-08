<?php
$color = array('pink', 'teal', 'purple', '', '');
?>
<div id="loading-page">
    <div class="lp-contents">
        <div class="bg"></div>
        <img src="/images/loading.gif" />
    </div>
</div>
<div id="desktop" class="page container">
    <?php $i = 0; foreach ($this->desktop['apps'] as $idx => $app): ?>
        <?php if ($app['requires_login'] && !$this->isLoggedIn) continue; ?>

        <div class="col-xs-4 col-lg-3" data-app="<?=$app['name']?>">
            <div class="desktop-icon <?='svg-' . $color[$i % count($color)]?> disabled">
                <?php require('../ui/images/icons/' . $app['name'] . '.svg'); ?>
                <p><?=$app['title']?></p>
            </div>
        </div>

    <?php $i++; endforeach; ?>
</div>