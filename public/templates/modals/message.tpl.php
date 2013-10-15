<?php if (isset($this->message) && !empty($this->message)): ?>
    <!-- Message -->
    <div class="alert alert-<?=$this->message['type']?> alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true"><i class="icon-remove"></i></button>
        <p><?=$this->message['message']?></p>
    </div>
<?php endif; ?>