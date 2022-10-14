<html>
<body>
    <!--*******************
        Preloader start
    ********************-->
    <div id="preloader">
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10" />
            </svg>
        </div>
    </div>
    <!--*******************
        Preloader end
    ********************-->
        <!--**********************************
            Content body start
        ***********************************-->
        <div class="content-body">
            <div class="container-fluid">
                <div class="text-center">
                    <h2 class="section-heading text-uppercase"></h2>
                </div>
                    <div class="row">  
                        <div class="col-md-6">
                            <div class="card card-widget">
                                <div class="card-body">
                                    <form style="text-align: center;">
                                        <h5 text-align="center">Fix Income</h5>
                                        <p></p>
                                        <span class="fa-stack fa-4x">
                                            <i class="fa fa-user fa-stack-1x fa-inverse"></i>
                                        </span>
                                            <p>Fasilitas : PPR</p>
                                            <p>Fasilitas : PTA</p>
                                            <p>Fasilitas : KTM</p>
                                            <input class="btn btn-dark" type="button" onClick="parent.location='<?php echo base_url();?>ide/initial_data_entry'" value="Pilih">
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-body">
                                    <form style="text-align: center;">
                                        <h5 text-align="center">Non Fix Income</h5>
                                        <p></p>
                                        <span class="fa-stack fa-4x">
                                            <i class="fa fa-signal fa-stack-1x fa-inverse"></i>
                                        </span>
                                            <p>Fasilitas : PPR</p>
                                            <p>Plafound > 500 Juta</p>
                                            <br></br>
                                        <input class="btn btn-dark" type="button" onClick="parent.location='<?php echo base_url();?>ide/initial_data_entry_non'" value="Pilih">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <!-- #/ container -->
        </div>
        <!--**********************************
            Content body end
        ***********************************-->
    
    <!--**********************************
        Main wrapper end
    ***********************************-->

    <!--**********************************
        Scripts
    ***********************************-->
    <script src="<?php echo base_url();?>/asset/e-fos/plugins/common/common.min.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/js/custom.min.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/js/settings.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/js/gleek.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/js/styleSwitcher.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/plugins/tables/js/jquery.dataTables.min.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/plugins/tables/js/datatable/dataTables.bootstrap4.min.js"></script>
    <script src="<?php echo base_url();?>/asset/e-fos/plugins/tables/js/datatable-init/datatable-basic.min.js"></script>

</body>

</html>