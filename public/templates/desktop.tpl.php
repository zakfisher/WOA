<div id="desktop" class="page container">
    <?php $i = 0; foreach ($this->desktop['apps'] as $idx => $app): ?>
        <?php if ($app['requires_login'] && !$this->isLoggedIn) continue; ?>
        <?php if ($i % 3 == 0): ?><div class="row"><?php endif; ?>
        <div class="col-xs-4" data-toggle="modal" href="#modal" data-modal="<?=$app['icon']?>" data-app>
            <div class="desktop-icon">
                <?php require('../ui/images/icons/' . $app['icon'] . '.svg'); ?>
                <p class="text-<?=$app['color']?>"><?=$app['title']?></p>
            </div>
        </div>
        <?php if ($i % 3 == 0 && $i > 0): ?></div><?php endif; ?>
    <?php $i++; endforeach; ?>
</div>