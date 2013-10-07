<div class="container">

    <!-- Message -->
    <?php if (isset($this->message) && !empty($this->message)): ?>
    <div class="alert alert-<?=$this->message['type']?> alert-dismissable">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <p><?=$this->message['message']?></p>
    </div>
    <?php endif; ?>

    <!-- Actions -->
    <div class="row row-offcanvas row-offcanvas-right">
        <div class="col-xs-12">
            <div class="row">
                <?php foreach ($this->actions as $action => $data): ?>
                <div class="col-12 col-sm-6 col-lg-4 pull-left">
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

    <?php if ($this->action == 'update-missing-data' && !empty($this->actionResults)): ?>
        <?php
        $track = $this->actionResults[0];
        $artist = $track['artist'];
        $title = $track['title'];
        $id = $track['music_id'];
        ?>
        <form role="form" method="post" action="?action=update-missing-data">
            <?php if ($artist == 'Unknown'): ?>
                <div class="form-group">
                    <label for="artist">Update artist</label>
                    <input type="text" class="form-control" id="artist" name="artist" placeholder="Enter artist">
                </div>
            <?php endif; ?>
            <?php if ($title == 'Unknown'): ?>
                <div class="form-group">
                    <label for="title">Update title</label>
                    <input type="text" class="form-control" id="title" name="title" placeholder="Enter title">
                </div>
            <?php endif; ?>
            <input type="hidden" name="music_id" value="<?=$id?>" />
            <button type="submit" class="btn btn-default" name="submit">Submit</button>
            <button type="submit" class="btn btn-danger" name="delete">Delete</button>
        </form>
    <?php endif; ?>

</div>