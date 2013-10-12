<!-- Header -->
<div class="container">
    <a class="navbar-brand" href="/admin">
        <?php require('../ui/images/edmcake_logo.svg'); ?>
    </a>
    <form class="navbar-form pull-right">
        <a href="#"><?=$this->user['first_name']?> <?=$this->user['last_name']?></a>
        <input type="hidden" name="logout" value="true" />
        <button type="submit" class="btn btn-primary">Logout</button>
    </form>
</div>

<!-- Nav Bar -->
<div class="navbar navbar-inverse">
    <div class="container">
        <ul class="nav navbar-nav">
            <li class="<?=$this->section=='data-tools'?'active':''?>"><a href="/admin">Data Tools</a></li>
            <li class="<?=$this->section=='users'?'active':''?>"><a href="/admin/users">Users</a></li>
            <li class="dropdown <?=$this->section=='documentation'?'active':''?>">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Documentation <b class="caret"></b></a>
                <ul class="dropdown-menu" role="menu">
                    <li class="<?=$this->section=='documentation'&&$this->subsection=='admin'?'active':''?>"><a href="/admin/documentation/admin">Admin</a></li>
                    <li class="<?=$this->section=='documentation'&&$this->subsection=='music'?'active':''?>"><a href="/admin/documentation/music">Music</a></li>
                    <li class="<?=$this->section=='documentation'&&$this->subsection=='user'?'active':''?>"><a href="/admin/documentation/user">User</a></li>
                </ul>
            </li>
        </ul>
    </div>
</div>