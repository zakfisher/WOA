<div class="navbar navbar-inverse">
    <div class="container">
        <a class="navbar-brand" href="#">WOA Admin Panel</a>
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <form class="navbar-form navbar-right">
            <a href="#"><?=$this->user['first_name']?> <?=$this->user['last_name']?></a>
            <input type="hidden" name="logout" value="true" />
            <button type="submit" class="btn btn-primary">Logout</button>
        </form>
    </div>
</div>