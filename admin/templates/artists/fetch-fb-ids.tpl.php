<?php if (!empty($this->actionResults)): ?>
<div class="container">
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="col-xs-12">
            <h3>Fetch FB IDs</h3>
            <?JSON::print_array($this->actionResults)?>
        </div>
    </div>
</div>
<?php endif; ?>