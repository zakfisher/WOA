<!-- Actions -->
<div class="row row-offcanvas row-offcanvas-right">
    <?php foreach ($this->actions as $action => $data): ?>
        <div class="col-12 col-sm-6 col-lg-4 pull-left">
            <h2><?=$data['title']?></h2>
            <p><?=$data['description']?></p>
            <p><a class="btn btn-primary" href="?action=<?=$action?>">Run &raquo;</a></p>
            <?php if (!empty($data['info'])): ?>
                <?php foreach ($data['info'] as $key => $val): ?>
                    <p><?=$key?>: <?=$val?></p>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>