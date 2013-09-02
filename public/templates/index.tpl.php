<input type="text" placeholder="search" id="search" style="font-size: 24px;width: 300px;">

<div id="latest">
    <h3>Latest Mixes</h3>
    <p>Uploaded: <?=$this->music['latestDate']?></p>
    <p>Total New: <?=count($this->music['mp3s'][$this->music['latest']])?></p>
    <p id="latest-count">Showing: <?=count($this->music['mp3s'][$this->music['latest']])?></p>
</div>
<div style="clear:both"></div>
<div id="latest-results" class="sm2-inline-list"> <!-- remove this class to have one item per line -->
    <?php foreach ($this->music['mp3s'][$this->music['latest']] as $mp3): ?>
        <div class="ui360 ui360-vis"><a href="<?=$mp3['url']?>"></a><p><?=$mp3['name']?></p></div>
    <?php endforeach; ?>
</div>
<div style="clear:both"></div>
<div id="all">
    <h3>All Mixes</h3>
    <p id="all-count">Results Found: <?=count($this->music['mp3s']['all'])?></p>
</div>
<div style="clear:both"></div>
<div id="all-results" class="sm2-inline-list"> <!-- remove this class to have one item per line -->
    <?php foreach ($this->music['mp3s']['all'] as $mp3): ?>
        <div class="ui360 ui360-vis"><a href="<?=$mp3['url']?>"></a><p><?=$mp3['name']?></p></div>
    <?php endforeach; ?>
</div>

<textarea id="json" style="display:none"><?=json_encode($this->music['mp3s']['all']);?></textarea>
<input type="hidden" id="latest-dir" value="<?=$this->music['latest']?>" />