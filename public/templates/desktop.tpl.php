<div id="desktop" class="page container">
    <?php $i = 0; foreach ($this->desktop['apps'] as $idx => $app): ?>
        <?php if ($app['requires_login'] && !$this->isLoggedIn) continue; ?>

        <div class="col-xs-4" data-toggle="modal" href="#modal" data-modal="<?=$app['icon']?>" data-app>
            <div class="desktop-icon<?=$app['requires_ajax']?' disabled':''?>">
                <?php require('../ui/images/icons/' . $app['icon'] . '.svg'); ?>
                <p class="text-<?=$app['color']?>"><?=$app['title']?></p>
            </div>
        </div>

    <?php $i++; endforeach; ?>
</div>