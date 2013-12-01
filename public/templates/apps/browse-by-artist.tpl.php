<!-- Browse By Artist -->
<script id="template-browse-by-artist" type="text/x-handlebars-template">
    <span id="browse-by-artist">
        <!-- Browse By Letter -->
        <div id="browse-by-artist-letter" class="pb"></div>
        <!-- Browse By Artist -->
        <div id="browse-by-artist-list" class="pb"></div>
        <!-- Browse Mixes By Artist -->
        <div id="browse-by-artist-mixes" class="pb"></div>
    </span>
</script>

<!-- Browse By Artist : Letter -->
<script id="template-browse-by-artist-letter" type="text/x-handlebars-template">
    {{#each letters}}
    <a href="javascript:void(0);" class="list-group-item clearfix">
        <h3 class="pull-left text-teal default-font">{{this}}</h3>
        <i class="icon-chevron-sign-right pull-right"></i>
    </a>
    {{/each}}
</script>

<!-- Browse By Artist : Artists -->
<script id="template-browse-by-artist-list" type="text/x-handlebars-template">
    {{#each artists}}
    <a href="javascript:void(0);" class="list-group-item clearfix">
        <h3 class="pull-left text-teal default-font">{{this}}</h3>
        <i class="icon-chevron-sign-right pull-right"></i>
    </a>
    {{/each}}
</script>

<!-- Browse By Artist : Mixes -->
<script id="template-browse-by-artist-mixes" type="text/x-handlebars-template">
    {{#each mixes}}
    <a href="javascript:void(0);" class="list-group-item clearfix" data-music-id="{{music_id}}">
        <i class="icon-play"></i>&nbsp;&nbsp;&nbsp;<b><span class="text-teal default-font">{{artist}}</span></b> {{title}}</a>
    </a>
    {{/each}}
</script>