<?php if (!empty($this->actionResults)): ?>
<div class="container">
    <form role="form" method="post" action="?action=update-artist-list">
        <div class="col-xs-12 col-md-6">
            <h3>Select Artist</h3>
            <select class="form-control" name="old_artist_name">
            <?php foreach ($this->actionResults as $artist): ?>
                <option><?=$artist?></option>
            <?php endforeach; ?>
            </select>
        </div>
        <div class="col-xs-12 col-md-6">
            <h3>New Name</h3>
            <input type="text" class="form-control" placeholder="Replace artist name" autofocus="" name="new_artist_name">
        </div>
        <div class="col-xs-4"></div>
        <div class="col-xs-4" style="margin-top: 20px;">
            <button class="btn btn-lg btn-primary btn-block" type="submit" name="submit">Update</button>
        </div>
    </form>
</div>
<?php endif; ?>