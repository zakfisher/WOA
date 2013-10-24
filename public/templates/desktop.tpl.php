<?php
$color = array('yellow', 'gold', 'pink', 'teal');
?>
<div id="desktop" class="page container">
    <?php $i = 0; foreach ($this->desktop['apps'] as $idx => $app): ?>
        <?php if ($app['requires_login'] && !$this->isLoggedIn) continue; ?>

        <div class="col-xs-4 col-lg-3" data-app="<?=$app['name']?>">
            <div class="desktop-icon<?=$app['requires_ajax']?' disabled':''?>">
                <?php require('../ui/images/icons/' . $app['name'] . '.svg'); ?>
                <p class="text-<?/* $color[$i % 4] */?>"><?=$app['title']?></p>
            </div>
        </div>

    <?php $i++; endforeach; ?>
</div>