<input type="text" placeholder="search" id="search" style="font-size: 24px;width: 300px;">

<div id="now-playing" class="hidden">
    <h3>Now Playing</h3>
    <p></p>
</div>

<div id="latest" class="clr">
    <h3>Latest Mixes</h3>
    <p>Uploaded: <?=$this->music['latestDate']?></p>
    <p>Total New: <?=count($this->music['mp3s'][$this->music['latest']])?></p>
    <p id="latest-count">Showing: <?=count($this->music['mp3s'][$this->music['latest']])?></p>
</div>

<div id="latest-results" class="clr">
    <?php foreach ($this->music['mp3s'][$this->music['latest']] as $mp3): ?>
        <a class="clr left" href="javascript:void(0);" data-url="<?=$mp3['url']?>"><?=$mp3['name']?></a>
    <?php endforeach; ?>
</div>

<div id="all" class="clr">
    <h3>All Mixes</h3>
    <p id="all-count">Results Found: <?=count($this->music['mp3s']['all'])?></p>
</div>

<div id="all-results" class="clr">
    <?php foreach ($this->music['mp3s']['all'] as $mp3): ?>
        <a class="clr left" href="javascript:void(0);" data-url="<?=$mp3['url']?>"><?=$mp3['name']?></a>
    <?php endforeach; ?>
</div>

<textarea id="json" style="display:none"><?=json_encode($this->music['mp3s']['all']);?></textarea>
<input type="hidden" id="latest-dir" value="<?=$this->music['latest']?>" />