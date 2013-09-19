<div class="container">
    <div class="page-header">
        <h4>Mixes Found <span id="result-count" class="label label-default"><?=count($this->music)?></span></h4>
    </div>
    <table id="track-list" class="table table-hover">
        <thead>
        <tr>
            <th>Artist</th>
            <th>Title</th>
            <th>Duration</th>
            <th>Added</th>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($this->music as $i => $mp3): ?>
            <tr data-id="<?=$mp3['music_id']?>">
                <td class="artist"><?=$mp3['artist']?></td>
                <td class="title"><?=$mp3['title']?></td>
                <td><?=$mp3['duration']?></td>
                <td><?=$mp3['added']?></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>
</div>