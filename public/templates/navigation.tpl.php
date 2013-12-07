<nav class="navbar navbar-default" role="navigation">

    <!-- Nav Bar -->
    <div class="navbar-header">
        <a class="navbar-brand" href="/"><?php require('../ui/images/edmcake_logo.svg'); ?></a>
        <?php if ($this->isLoggedIn): ?>
        <i class="icon-gear options-menu pull-right" data-toggle="modal" href="#modal" data-modal="user-menu"></i>
        <?php else: ?>
        <i class="icon-user options-menu pull-right" data-toggle="modal" href="#modal" data-modal="login"></i>
        <?php endif; ?>
    </div>

    <!-- Search Bar -->
    <form class="navbar-form" role="search">
        <div class="form-group">
            <i class="icon-search pull-right" data-app="search"></i>
            <input type="text" list="mix-list" class="form-control pull-right" name="search" placeholder="Search" />
<!--            <datalist id="mix-list">-->
<!--                <option>EDX</option>-->
<!--                <option>Avicii</option>-->
<!--                <option>Steve Aoki</option>-->
<!--            </datalist>-->
        </div>
    </form>
</nav>