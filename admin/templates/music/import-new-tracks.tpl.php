<?php if (!empty($this->actionResults)): ?>
<div class="container">
    <div class="row row-offcanvas row-offcanvas-right">
        <h3>Import New Tracks</h3>
        <div class="col-xs-12">
            <?JSON::print_array($this->actionResults)?>
        </div>
    </div>
</div>
<?php endif; ?>