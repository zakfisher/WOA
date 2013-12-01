<!-- Search -->
<script id="template-search" type="text/x-handlebars-template">
    <span id="search">
        <img class="search-loading" src="/images/loading-page.gif" />
        <input type="text" name="search" list="mix-list" placeholder="..." />
        <div id="search-results" class="pb"></div>
    </span>
</script>

<!-- Search : Results -->
<script id="template-search-results" type="text/x-handlebars-template">
    {{#if noResults}}
    <p>No results found.</p>
    {{else}}
    {{#each results}}
    <a href="javascript:void(0);" class="list-group-item clearfix" data-music-id="{{music_id}}">
        <i class="icon-play"></i>&nbsp;&nbsp;&nbsp;<b><span class="text-teal default-font">{{artist}}</span></b> {{title}}</a>
    </a>
    {{/each}}
    {{/if}}
</script>