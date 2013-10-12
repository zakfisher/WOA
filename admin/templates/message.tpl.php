<?php if (isset($this->message) && !empty($this->message)): ?>
    <!-- Message -->
    <div class="container">
        <div class="alert alert-<?=$this->message['type']?> alert-dismissable">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <p><?=$this->message['message']?></p>
        </div>
    </div>
<?php endif; ?>