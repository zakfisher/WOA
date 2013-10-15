<?php if (!empty($this->actionResults)): ?>
<div class="container">
    <h3>Update Missing Data</h3>
    <div class="col-xs-12 col-sm-6">
        <?JSON::print_array($this->actionResults)?>
    </div>
    <?php
    $track = $this->actionResults[0];
    $artist = $track['artist'];
    $title = $track['title'];
    $id = $track['music_id'];
    ?>
    <div class="col-xs-12 col-sm-6">
        <form role="form" method="post" action="?action=update-missing-data">
            <div class="form-group">
                <label for="artist">Update Artist</label>
                <input type="text" class="form-control" id="artist" name="artist" placeholder="Enter artist" value="<?=$artist?>">
            </div>
            <div class="form-group">
                <label for="title">Update Title</label>
                <input type="text" class="form-control" id="title" name="title" placeholder="Enter title" value="<?=$title?>">
            </div>
            <input type="hidden" name="music_id" value="<?=$id?>" />
            <button type="submit" class="btn btn-primary" name="submit">Submit</button>
            <button type="submit" class="btn btn-danger" name="delete">Delete</button>
        </form>
    </div>
</div>
<?php endif; ?>