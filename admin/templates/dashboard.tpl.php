<div class="container">

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

    <!-- Action Results -->
    <div class="row row-offcanvas row-offcanvas-right">
        <?php if (!empty($this->actionResults)): ?>
            <div class="col-xs-12">
                <?JSON::print_array($this->actionResults)?>
            </div>
        <?php endif; ?>
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
            <button type="submit" class="btn btn-primary" name="submit">Submit</button>
            <button type="submit" class="btn btn-danger" name="delete">Delete</button>
        </form>
    <?php endif; ?>


    <?php switch ($this->section) {
        case 'data-tools':

            break;
            break;
        case 'suites':
            $this->display('templates/suites-'.$this->subsection.'.tpl.php');
            break;
    } ?>
    <?php  ?>

</div>