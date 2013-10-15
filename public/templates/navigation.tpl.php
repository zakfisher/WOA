<nav class="navbar navbar-default" role="navigation">

    <!-- Nav Bar -->
    <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/"><?php require('../ui/images/edmcake_logo.svg'); ?></a>
        <?php if ($this->isLoggedIn): ?>
        <i class="icon-gear options-menu pull-right" data-toggle="modal" href="#modal" data-modal="logged-in-menu" data-nav-menu></i>
        <?php else: ?>
        <i class="icon-user options-menu pull-right" data-toggle="modal" href="#modal" data-modal="logged-out-menu" data-nav-menu></i>
        <?php endif; ?>
    </div>

    <!-- Search Bar -->
    <div class="collapse navbar-collapse navbar-ex1-collapse">
        <form class="navbar-form navbar-right" role="search">
            <div class="form-group">
                <input type="text" list="mix-list" class="form-control pull-left" placeholder="Search artists, events, & mixes.">
<!--                <datalist id="mix-list">-->
<!--                    <option>EDX</option>-->
<!--                    <option>Avicii</option>-->
<!--                    <option>Steve Aoki</option>-->
<!--                </datalist>-->
                <i class="icon-search pull-left"></i>
            </div>
        </form>
    </div>
    <div class="toggle-search-bar">
        <i class="icon-chevron-down"></i>
    </div>
</nav>