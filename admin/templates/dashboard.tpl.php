<div class="container">

    <div class="row row-offcanvas row-offcanvas-right">
        <div class="col-xs-6">
            <div class="row">
                <?php foreach ($this->actions as $action => $data): ?>
                <div class="col-12 col-sm-12 col-lg-12">
                    <h2><?=$data['title']?></h2>
                    <p><?=$data['description']?></p>
                    <p><a class="btn btn-default" href="?action=<?=$action?>">Run &raquo;</a></p>
                    <?php if (!empty($data['info'])): ?>
                        <?php foreach ($data['info'] as $key => $val): ?>
                        <p><?=$key?>: <?=$val?></p>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
    <div class="row row-offcanvas row-offcanvas-right">
    <?php if (!empty($this->actionResults)): ?>
        <div class="col-xs-12">
            <pre>
<?print_r($this->actionResults)?>
            </pre>
        </div>
    <?php endif; ?>
    </div>
</div>