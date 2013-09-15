<div class="container">
    <div class="page-header">
        <ul id="tabs" class="nav nav-pills">
            <li class="active"><a href="#latest-mixes" data-toggle="tab"><span class="badge pull-right"><?=count($this->latest)?></span>Latest Mixes</a></li>
            <li><a href="#all-mixes" data-toggle="tab"><span class="badge pull-right"><?=count($this->music['all'])?></span>All Mixes</a></li>
        </ul>
    </div>
    <div class="tab-content">
        <div class="tab-pane fade in active" id="latest-mixes">
            <div class="bs-example">
                <table id="latest-results" class="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Artist</th>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Added</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($this->latest as $i => $mp3): ?>
                    <tr>
                        <td><?=$i+1?></td>
                        <td><?=$mp3['artist']?></td>
                        <td><?=$mp3['title']?></td>
                        <td><?=$mp3['duration']?></td>
                        <td><?=$mp3['added']?></td>
                    </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-pane fade" id="all-mixes">
            <div class="bs-example">
                <table id="latest-results" class="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Artist</th>
                        <th>Title</th>
                        <th>Duration</th>
                        <th>Added</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php foreach ($this->music['all'] as $i => $mp3): ?>
                    <?php if ($i == $this->displayable) break; ?>
                        <tr>
                            <td><?=$i+1?></td>
                            <td><?=$mp3['artist']?></td>
                            <td><?=$mp3['title']?></td>
                            <td><?=$mp3['duration']?></td>
                            <td><?=$mp3['added']?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>