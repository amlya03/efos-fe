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
                <form id="data_entry_form" method="post" action="<?php echo base_url();?>data_entry/postUpdatede" onsubmit="return validateFormPersonal()" required>
                    <div class="card">
                        <h4 class="card card-body gradient-9" style="text-align: center;">Informasi Nasabah</h4>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Nomor Aplikasi<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="hidden" id="pe" name="pe" value="<?=$this->session->userdata('pemisah');?>" class="form-control" >
                                            <input id="app_no_ide" name="app_no_ide"type="text" class="form-control" placeholder="app_no_ide"  value="<?=$app_no_ide?>" readonly>
                                        </div>
                                        <div class="col-sm-9">
                                            <input id="app_no_de" name="app_no_de"type="hidden" class="form-control" placeholder="app_no_ide"  value="<?=$app_no_de?>" readonly>
                                        </div>
                                        <div class="col-sm-9">
                                           <input type="hidden" id="curef_id" name="curef_id" value="<?=$curef?>" class="form-control" >
                                        </div>
                                        <div class="col-sm-9">
                                          <input type="hidden" id="id" name="id_customer" value="<?=$id?>" class="form-control" >
                                          <input type="hidden" id="id" name="id" value="<?=$id_customer?>" class="form-control" >
                                          <input type="hidden" id="WADUH" name="WADUH" value="<?=$this->session->userdata('GROUP_NAME');?>" class="form-control" >
                                          </div>

                                        <div class="col-sm-9">
                                           <input type="hidden" id="kategori_pekerjaan" name="kategori_pekerjaan" value="<?=$kategori_pekerjaan?>" class="form-control" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Nama Lengkap<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" placeholder="Nama Lengkap" name="nama" id="nama" value="<?=$nama?>" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Jenis Kelamin<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="jenis_kelamin" name="jenis_kelamin" value="<?=$jenis_kelamin?>" >
                                                    <option value="<?=$jenis_kelamin?>"><?=$jenis_kelamin?></option>
                                                    <option value="Laki-laki">Laki - laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Tanggal Lahir<span class="text-danger">*</span></label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="date" id="tanggal_lahir" name="tanggal_lahir" value="<?=$tanggal_lahir?>" >
                                    </div>
                                </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Tempat Lahir<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" placeholder="Tempat Lahir"id="tempat_lahir" name="tempat_lahir" value="<?=$tempat_lahir?>" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Usia<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" maxlength="2" class="form-control" placeholder="Usia" id="usia" name="usia" value="<?=$usia?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Agama<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="agama" name="agama"  >
                                                <option value="<?=$agama?>"><?=$agama?></option>
                                                    <option>Islam</option>
                                                    <option>Kristen</option>
                                                    <option>Khatolik</option>
                                                    <option>Budha</option>
                                                    <option>Hindu</option>
                                                    <option>Kong Hu Chu</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Pendidikan<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="pendidikan" name="pendidikan" >
                                                <option value="<?=$pendidikan?>"><?=$pendidikan?></option>
                                                    <option>SMA</option>
                                                    <option>D3</option>
                                                    <option>S1</option>
                                                    <option>S2</option>
                                                    <option>S3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Kewarganegaraan<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="kewarganegaraan" name="kewarganegaraan"  >
                                                <option value="<?=$kewarganegaraan?>"><?=$kewarganegaraan?></option>
                                                    <option>WNI</option>
                                                    <option>WNA</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Nomor Telepon</label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" pattern="^(\+62|62|0)(8|[2-7])[1-9][0-9]{6,9}$"  class="form-control" placeholder="Nomor Telepon" id="no_telepon" name="no_telepon" value="<?=$no_telepon?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Email<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" placeholder="Email" id="email" name="email" value="<?=$email?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">No Handphone<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)"  pattern="^(\+62|62|0)(8|[2-7])[1-9][0-9]{6,9}$" class="form-control" placeholder="No Handphone" id="no_handphone" name="no_handphone" value="<?=$no_handphone?>" maxlength="13">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">No KTP<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" minlength="16" maxlength="16" class="form-control" placeholder="No KTP" id="no_ktp" name="no_ktp" value="<?=$no_ktp?>">
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Tanggal Terbit KTP<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                    <input class="form-control" type="date" id="tanggal_terbit_ktp" name="tanggal_terbit_ktp" value="<?=$tanggal_terbit_ktp?>">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label"> KTP Seumur Hidup<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                    <label for="chkInfoYes">
                                                        <input type="radio" id="chkInfoYes" name="radioKtp"  value="fix" <?php if($status_ktp== "fix") echo "checked"?>/> Ya
                                                    </label>
                                                    <label for="chkInfoNo">
                                                        <input type="text" hidden id="buatKondisiKtp" value="<?=$status_ktp?>">
                                                        <input type="radio" id="chkInfoNo" name="radioKtp"  value="non" <?php if($status_ktp== "non") echo "checked"?>/> Tidak
                                                    </label>
                                            </div>
                                    </div>
                                    <div class="ktpPersonal" id="ktpPersonal">
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Tanggal Exipred KTP<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                    <input class="form-control" type="date" id="tanggal_exp_ktp" name="tanggal_exp_ktp" value="<?=$tanggal_exp_ktp?>">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">NPWP</label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" class="form-control" placeholder="NPWP" maxlength="16" id="npwp" name="npwp" value="<?=$npwp?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Status Perkawinan<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="status_perkawinan" name="status_perkawinan">
                                                <option value="<?=$status_perkawinan?>"><?=$status_perkawinan?></option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Jumlah Anak<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" class="form-control" placeholder="Jumlah Anak" maxlength="2" id="jumlah_anak" name="jumlah_anak" value="<?=$jumlah_anak?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Status Rumah</label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" value=""id="status_rumah" name="status_rumah">
                                                    <option>
                                                        <?php
                                                            if($status_rumah == 1){echo 'MILIK SENDIRI'}
                                                            if($status_rumah == 2){echo 'SEWA / KONTRAK'}
                                                            if($status_rumah == 3){echo 'KELUARGA'}
                                                            if($status_rumah == 4){echo 'RUMAH DINAS'}
                                                        ?>
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Lama Menetap<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" maxlength="2" class="form-control" placeholder="Lama Menetap" id="lama_menetap" name="lama_menetap" value="<?=$lama_menetap?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Punya Kendaraan<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="status_kendaraan" name="status_kendaraan">
                                                    <option value="<?=$status_kendaraan?>">
                                                        <?php if($status_kendaraan == 1)echo "Ya"?>
                                                        <?php if($status_kendaraan == 2)echo "Tidak"?>
                                                        <?php if($status_kendaraan == "") echo "Pilih status kendaraan"?>
                                                    </option>
                                                    <option value="1">Ya</option>
                                                    <option value="2">Tidak</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row" id="hidden_tipe_kendaraan" style="display: none;">
                                        <label class="col-sm-3 col-form-label">Tipe Kendaraan<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" value="" id="tipe_kendaraan" name="tipe_kendaraan">
                                                    <option value="<?=$tipe_kendaraan?>">
                                                    <?php   if($tipe_kendaraan == "") echo "Pilih tipe kendaraan";
                                                            else if($tipe_kendaraan =="Motor")echo "Motor";
                                                            else if($tipe_kendaraan == "Mobil")echo "Mobil";
                                                            else if($tipe_kendaraan == "Mobil dan Motor")echo "Mobil dan Motor";
                                                     ?>
                                                </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h4 class="card-body gradient-9" style="text-align: center;">Alamat Pemohon</h4>
                            <div class="row">
                                <div class="col">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Alamat KTP<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                        <textarea class="form-control h-150px" rows="6" id="alamat_ktp" name="alamat_ktp" value="<?=$alamat?>"><?=$alamat?></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Provinsi<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="provinsi_cabang" name="provinsi" >
                                                    <option ><?=$provinsi?></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Kota<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="kabkota_cabang" name="kabkota" >
                                                    <option ><?=$kabkota?></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Kecamatan<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <select class="form-control" id="kecamatan" name="kecamatan" >
                                                        <option ><?=$kecamatan?></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Kelurahan<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <select class="form-control" id="kelurahan" name="kelurahan" >
                                                        <option ><?=$kelurahan?> </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Kode Pos<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                <div class="input-group-append">
                                                    <input   type="tel" onkeypress="return onlyNumberKey(event)" class="form-control" id="kode_pos" name="kode_pos" value="<?=$kode_pos?>">
                                                    <button  id='kode_poshilang' onclick="buatisi()"class="btn btn-outline-dark" type="button">Cari Data</button>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">RT / RW<span class="text-danger">*</span></label>
                                        <div class="col">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" class="form-control" placeholder="RT" maxlength="3" id="rt" name="rt" value="<?=$rt?>">
                                        </div>
                                        <h2>/</h2>
                                        <div class="col">
                                            <input type="tel" onkeypress="return onlyNumberKey(event)" class="form-control" placeholder="RW" maxlength="3" id="rw" name="rw" value="<?=$rw?>">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Alamat Sama dengan Alamat KTP</label>
                                        <div class="col-sm-9">
                                            <input type="radio" name="samaDomisili" id="takSama" value="0" <?php if($status_alamat == 0 || $status_alamat == '') echo 'checked';?>>Tidak Sama
                                            <input type="radio" name="samaDomisili" id="iyaSama" value="1" <?php if($status_alamat == 1) echo 'checked';?>>Sama
                                        </div>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Alamat Domisili<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                        <textarea class="form-control h-150px" rows="6" id="alamat_domisili" name="alamat_domisili" value="<?=$alamat_domisili?>"><?=$alamat_domisili?></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Provinsi</label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="provinsi_domisili" name="provinsi_domisili" >
                                                    <option><?=$provinsi_domisili?></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label">Kota<span class="text-danger">*</span></label>
                                        <div class="col-sm-9">
                                            <div class="form-group">
                                                <select class="form-control" id="kabkota_domisili" name="kabkota_domisili" >
                                                    <option><?=$kabkota_domisili?></option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">kecamatan<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <select class="form-control" id="kecamatan_domisili" name="kecamatan_domisili" >
                                                        <option><?=$kecamatan_domisili?></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Kelurahan<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                <div class="form-group">
                                                    <select class="form-control" id="kelurahan_domisili" name="kelurahan_domisili" >
                                                        <option><?=$kelurahan_domisili?></option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">Kode Pos<span class="text-danger">*</span></label>
                                            <div class="col-sm-9">
                                                <div class="input-group-append">
                                                    <input type="tel" onkeypress="return onlyNumberKey(event)" maxlength="8"  class="form-control" id="kode_pos_domisili" name="kode_pos_domisili" value="<?=$kode_pos_domisili?>">
                                                    <button onclick="buatisidomisili()" class="btn btn-outline-dark"  id='kode_pos_domisilihilang' type="button">Cari Data</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label class="col-sm-3 col-form-label">RT / RW<span class="text-danger">*</span></label>
                                            <div class="col">
                                                <input type="tel" onkeypress="return onlyNumberKey(event)" maxlength="3" class="form-control" placeholder="RT" id="rt_domisili" name="rt_domisili" value="<?=$rt_domisili?>">
                                            </div>
                                            <h2>/</h2>
                                            <div class="col">
                                                <input type="tel" onkeypress="return onlyNumberKey(event)" class="form-control" placeholder="RW" maxlength="3" id="rw_domisili" name="rw_domisili" value="<?=$rw_domisili?>">
                                            </div>
                                        </div>
                                    <button id="btn" name="simpandata" value="simpandata"type="submit" onclick="" class="btn btn-dark" style="float: right;">Simpan Data</button>
                                    <button id="btn_selanjutnya" name="selanjutnya" value="selanjutnya" type="submit" onclick="" class="btn btn-warning" style="float: right;">Selanjutnya<span>&nbsp;<i class="fa fa-chevron-circle-right"></i></span></button>
                                    <!-- <button id="btn" name="btn"type="submit" onclick="" class="btn btn-dark" style="float: right;">Simpan Data</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
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

    <!-- validasi personal info -->
    <script>
        function validateFormPersonal(){
            var validasiFormPersonal = document.getElementById('status_kendaraan').value;
                // alert("test"+validasiFormPersonal)
                if(validasiFormPersonal == 0){
                    var a = document.forms["data_entry_form"]["nama"].value;
                    if (a== null || a=="") {
                        document.getElementById("nama").focus();
                        alert("Nama Lengkap Harus diisi");
                        return false;
                    }
                    var b = document.forms["data_entry_form"]["jenis_kelamin"].value;
                    if (b=="" || b== null) {
                        document.getElementById("jenis_kelamin").focus();
                        alert("Jenis Kelamin Harus diisi");
                        return false;
                    }
                    var c = document.forms["data_entry_form"]["tanggal_lahir"].value;
                    if (c=="" || c== null) {
                        document.getElementById("tanggal_lahir").focus();
                        alert("Tanggal Lahir Harus diisi");
                        return false;
                    }
                    var d = document.forms["data_entry_form"]["tempat_lahir"].value;
                    if (d=="" || d== null) {
                        document.getElementById("tempat_lahir").focus();
                        alert("Tempat Lahir Harus diisi");
                        return false;
                    }
                    var e = document.forms["data_entry_form"]["status_perkawinan"].value;
                    if (e=="" || e== null) {
                        document.getElementById("status_perkawinan").focus();
                        alert("Status Perkawinan Harus diisi");
                        return false;
                    }
                    var f = document.forms["data_entry_form"]["agama"].value;
                    if (f=="" || f== null) {
                        document.getElementById("agama").focus();
                        alert("Agama Harus diisi");
                        return false;
                    }
                    var g = document.forms["data_entry_form"]["pendidikan"].value;
                    if (g=="" || g== null) {
                        document.getElementById("pendidikan").focus();
                        alert("Pendidikan Harus diisi");
                        return false;
                    }
                    var h = document.forms["data_entry_form"]["kewarganegaraan"].value;
                    if (h=="" || h== null) {
                        document.getElementById("kewarganegaraan").focus();
                        alert("Kewarganegaraan Harus diisi");
                        return false;
                    }
                    var hh = document.forms["data_entry_form"]["status_rumah"].value;
                    if (hh=="" || hh== null) {
                        document.getElementById("status_rumah").focus();
                        alert("Status Rumah Harus diisi");
                        return false;
                    }
                    var i = document.forms["data_entry_form"]["no_handphone"].value;
                    if (i=="" || i== null) {
                        document.getElementById("no_handphone").focus();
                        alert("No Handphone Harus diisi");
                        return false;
                    }
                    // var i = document.forms["data_entry_form"]["no_telepon"].value;
                    // if (i=="" || i== null) {
                    //     document.getElementById("no_telepon").focus();
                    //     alert("No Telepon Harus diisi");
                    //     return false;
                    // }
                    var i = document.forms["data_entry_form"]["no_ktp"].value;
                    if (i=="" || i== null) {
                        document.getElementById("no_ktp").focus();
                        alert("No KTP Harus diisi");
                        return false;
                    }
                    var j = document.forms["data_entry_form"]["email"].value;
                    if (j=="" || j== null) {
                        document.getElementById("email").focus();
                        alert("Email Harus diisi");
                        return false;
                    }
                    var k = document.forms["data_entry_form"]["alamat_ktp"].value;
                    if (k=="" || k== null) {
                        document.getElementById("alamat_ktp").focus();
                        alert("Alamat KTP Harus diisi");
                        return false;
                    }
                    var l = document.forms["data_entry_form"]["provinsi"].value;
                    if (l=="" || l== null) {
                        document.getElementById("provinsi").focus();
                        alert("Provinsi Harus diisi");
                        return false;
                    }
                    var m = document.forms["data_entry_form"]["kabkota"].value;
                    if (m=="" || m== null) {
                    var m = document.forms["data_entry_form"]["kabkota"].value;
                        document.getElementById("").focus();
                        alert("Kota Harus diisi");
                        return false;
                    }
                    var n = document.forms["data_entry_form"]["kecamatan"].value;
                    if (n=="" || n== null) {
                        document.getElementById("kecamatan").focus();
                        alert("Kecamatan Harus diisi");
                        return false;
                    }
                    var o = document.forms["data_entry_form"]["kelurahan"].value;
                    if (o=="" || o== null) {
                        document.getElementById("kelurahan").focus();
                        alert("Kelurahan Harus diisi");
                        return false;
                    }
                    var p = document.forms["data_entry_form"]["kode_pos"].value;
                    if (p=="" || p== null) {
                        document.getElementById("kode_pos").focus();
                        alert("Kode Pos Harus diisi");
                        return false;
                    }
                    var q = document.forms["data_entry_form"]["rt"].value;
                    if (q=="" || q== null) {
                        document.getElementById("rt").focus();
                        alert("RT Harus diisi");
                        return false;
                    }
                    var r = document.forms["data_entry_form"]["rw"].value;
                    if (r=="" || r== null) {
                        document.getElementById("rw").focus();
                        alert("RW Harus diisi");
                        return false;
                    }
                    var s = document.forms["data_entry_form"]["no_ktp"].value;
                    if (s=="" || s== null) {
                        document.getElementById("no_ktp").focus();
                        alert("No KTP Harus diisi");
                        return false;
                    }
                    var t = document.forms["data_entry_form"]["tanggal_terbit_ktp"].value;
                    if (t=="" || t== null) {
                        document.getElementById("tanggal_terbit_ktp").focus();
                        alert("Tanggal Terbit Harus diisi");
                        return false;
                    }
                    var tt = document.forms["data_entry_form"]["jumlah_anak"].value;
                    if (tt=="" || tt== null) {
                        document.getElementById("jumlah_anak").focus();
                        alert("Jumlah Anak Harus diisi");
                        return false;
                    }
                    var a1 = document.forms["data_entry_form"]["lama_menetap"].value;
                    if (a1=="" || a1== null) {
                        document.getElementById("lama_menetap").focus();
                        alert("Lama Menetap Harus diisi");
                        return false;
                    }
                    var b1 = document.forms["data_entry_form"]["status_kendaraan"].value;
                    if (b1=="" || b1== null) {
                        document.getElementById("status_kendaraan").focus();
                        alert("Status Kendaraan Harus diisi");
                        return false;
                    }
                    // var c1 = document.forms["data_entry_form"]["tipe_kendaraan"].value;
                    // if (c1=="" || c1== null) {
                    //     alert("Tipe Kendaraan Harus diisi");
                    //     return false;
                    // }
                    var d1 = document.forms["data_entry_form"]["alamat_domisili"].value;
                    if (d1=="" || d1== null) {
                        document.getElementById("alamat_domisili").focus();
                        alert("Alamat Domisili Harus diisi");
                        return false;
                    }
                    var e1 = document.forms["data_entry_form"]["rt_domisili"].value;
                    if (e1=="" || e1== null) {
                        document.getElementById("rt_domisili").focus();
                        alert("RT Domisili Harus diisi");
                        return false;
                    }
                    var f1 = document.forms["data_entry_form"]["rw_domisili"].value;
                    if (f1=="" || f1== null) {
                        document.getElementById("rw_domisili").focus();
                        alert("RW domisili Harus diisi");
                        return false;
                    }
                    var g1 = document.forms["data_entry_form"]["provinsi_domisili"].value;
                    if (g1=="" || g1== null) {
                        document.getElementById("provinsi_domisili").focus();
                        alert("Provinsi Domisili Harus diisi");
                        return false;
                    }
                    var h1 = document.forms["data_entry_form"]["kabkota_domisili"].value;
                    if (h1=="" || h1== null) {
                        document.getElementById("kabkota_domisili").focus();
                        alert("Kota Domisili Harus diisi");
                        return false;
                    }
                    var i1 = document.forms["data_entry_form"]["kelurahan_domisili"].value;
                    if (i1=="" || i1== null) {
                        document.getElementById("kelurahan_domisili").focus();
                        alert("Kelurahan Domisili  Harus diisi");
                        return false;
                    }
                    var j1 = document.forms["data_entry_form"]["kecamatan_domisili"].value;
                    if (j1=="" || j1== null) {
                        document.getElementById("kecamatan_domisili").focus();
                        alert("Kecamatan Domisili Harus diisi");
                        return false;
                    }
                    var k1 = document.forms["data_entry_form"]["kode_pos_domisili"].value;
                    if (k1=="" || k1== null) {
                        document.getElementById("kode_pos_domisili").focus();
                        alert("Kode Pos Harus diisi");
                        return false;
                    }
                }
                else if(validasiFormPersonal == 1){
                    var a = document.forms["data_entry_form"]["nama"].value;
                    if (a== null || a=="") {
                        document.getElementById("nama").focus();
                        alert("Nama Lengkap Harus diisi");
                        return false;
                    }
                    var b = document.forms["data_entry_form"]["jenis_kelamin"].value;
                    if (b=="" || b== null) {
                        document.getElementById("jenis_kelamin").focus();
                        alert("Jenis Kelamin Harus diisi");
                        return false;
                    }
                    var c = document.forms["data_entry_form"]["tanggal_lahir"].value;
                    if (c=="" || c== null) {
                        document.getElementById("tanggal_lahir").focus();
                        alert("Tanggal Lahir Harus diisi");
                        return false;
                    }
                    var d = document.forms["data_entry_form"]["tempat_lahir"].value;
                    if (d=="" || d== null) {
                        document.getElementById("tempat_lahir").focus();
                        alert("Tempat Lahir Harus diisi");
                        return false;
                    }
                    var e = document.forms["data_entry_form"]["status_perkawinan"].value;
                    if (e=="" || e== null) {
                        document.getElementById("status_perkawinan").focus();
                        alert("Status Perkawinan Harus diisi");
                        return false;
                    }
                    var f = document.forms["data_entry_form"]["agama"].value;
                    if (f=="" || f== null) {
                        document.getElementById("agama").focus();
                        alert("Agama Harus diisi");
                        return false;
                    }
                    var g = document.forms["data_entry_form"]["pendidikan"].value;
                    if (g=="" || g== null) {
                        document.getElementById("pendidikan").focus();
                        alert("Pendidikan Harus diisi");
                        return false;
                    }
                    var h = document.forms["data_entry_form"]["kewarganegaraan"].value;
                    if (h=="" || h== null) {
                        document.getElementById("kewarganegaraan").focus();
                        alert("Kewarganegaraan Harus diisi");
                        return false;
                    }
                    var hh = document.forms["data_entry_form"]["status_rumah"].value;
                    if (hh=="" || hh== null) {
                        document.getElementById("status_rumah").focus();
                        alert("Status Rumah Harus diisi");
                        return false;
                    }
                    var i = document.forms["data_entry_form"]["no_handphone"].value;
                    if (i=="" || i== null) {
                        document.getElementById("no_handphone").focus();
                        alert("No Handphone Harus diisi");
                        return false;
                    }
                    // var i = document.forms["data_entry_form"]["no_telepon"].value;
                    // if (i=="" || i== null) {
                    //     document.getElementById("no_telepon").focus();
                    //     alert("No Telepon Harus diisi");
                    //     return false;
                    // }
                    var i = document.forms["data_entry_form"]["no_ktp"].value;
                    if (i=="" || i== null) {
                        document.getElementById("no_ktp").focus();
                        alert("No KTP Harus diisi");
                        return false;
                    }
                    var j = document.forms["data_entry_form"]["email"].value;
                    if (j=="" || j== null) {
                        document.getElementById("email").focus();
                        alert("Email Harus diisi");
                        return false;
                    }
                    var k = document.forms["data_entry_form"]["alamat_ktp"].value;
                    if (k=="" || k== null) {
                        document.getElementById("alamat_ktp").focus();
                        alert("Alamat KTP Harus diisi");
                        return false;
                    }
                    var l = document.forms["data_entry_form"]["provinsi"].value;
                    if (l=="" || l== null) {
                        document.getElementById("provinsi").focus();
                        alert("Provinsi Harus diisi");
                        return false;
                    }
                    var m = document.forms["data_entry_form"]["kabkota"].value;
                    if (m=="" || m== null) {
                        document.getElementById("kabkota").focus();
                        alert("Kota Harus diisi");
                        return false;
                    }
                    var n = document.forms["data_entry_form"]["kecamatan"].value;
                    if (n=="" || n== null) {
                        document.getElementById("kecamatan").focus();
                        alert("Kecamatan Harus diisi");
                        return false;
                    }
                    var o = document.forms["data_entry_form"]["kelurahan"].value;
                    if (o=="" || o== null) {
                        document.getElementById("kelurahan").focus();
                        alert("Kelurahan Harus diisi");
                        return false;
                    }
                    var p = document.forms["data_entry_form"]["kode_pos"].value;
                    if (p=="" || p== null) {
                        document.getElementById("kode_pos").focus();
                        alert("Kode Pos Harus diisi");
                        return false;
                    }
                    var q = document.forms["data_entry_form"]["rt"].value;
                    if (q=="" || q== null) {
                        document.getElementById("rt").focus();
                        alert("RT Harus diisi");
                        return false;
                    }
                    var r = document.forms["data_entry_form"]["rw"].value;
                    if (r=="" || r== null) {
                        document.getElementById("rw").focus();
                        alert("RW Harus diisi");
                        return false;
                    }
                    var s = document.forms["data_entry_form"]["no_ktp"].value;
                    if (s=="" || s== null) {
                        document.getElementById("no_ktp").focus();
                        alert("No KTP Harus diisi");
                        return false;
                    }
                    var t = document.forms["data_entry_form"]["tanggal_terbit_ktp"].value;
                    if (t=="" || t== null) {
                        document.getElementById("tanggal_terbit_ktp").focus();
                        alert("Tanggal Terbit Harus diisi");
                        return false;
                    }
                    var tt = document.forms["data_entry_form"]["jumlah_anak"].value;
                    if (tt=="" || tt== null) {
                        document.getElementById("jumlah_anak").focus();
                        alert("Jumlah Anak Harus diisi");
                        return false;
                    }
                    var a1 = document.forms["data_entry_form"]["lama_menetap"].value;
                    if (a1=="" || a1== null) {
                        document.getElementById("lama_menetap").focus();
                        alert("Lama Menetap Harus diisi");
                        return false;
                    }
                    var b1 = document.forms["data_entry_form"]["status_kendaraan"].value;
                    if (b1=="" || b1== null) {
                        document.getElementById("status_kendaraan").focus();
                        alert("Status Kendaraan Harus diisi");
                        return false;
                    }
                    var c1 = document.forms["data_entry_form"]["tipe_kendaraan"].value;
                    if (c1=="" || c1== null) {
                        document.getElementById("tipe_kendaraan").focus();
                        alert("Tipe Kendaraan Harus diisi");
                        return false;
                    }
                    var d1 = document.forms["data_entry_form"]["alamat_domisili"].value;
                    if (d1=="" || d1== null) {
                        document.getElementById("alamat_domisili").focus();
                        alert("Alamat Domisili Harus diisi");
                        return false;
                    }
                    var e1 = document.forms["data_entry_form"]["rt_domisili"].value;
                    if (e1=="" || e1== null) {
                        document.getElementById("rt_domisili").focus();
                        alert("RT Domisili Harus diisi");
                        return false;
                    }
                    var f1 = document.forms["data_entry_form"]["rw_domisili"].value;
                    if (f1=="" || f1== null) {
                        document.getElementById("rw_domisili").focus();
                        alert("RW domisili Harus diisi");
                        return false;
                    }
                    var g1 = document.forms["data_entry_form"]["provinsi_domisili"].value;
                    if (g1=="" || g1== null) {
                        document.getElementById("provinsi_domisili").focus();
                        alert("Provinsi Domisili Harus diisi");
                        return false;
                    }
                    var h1 = document.forms["data_entry_form"]["kabkota_domisili"].value;
                    if (h1=="" || h1== null) {
                        document.getElementById("kabkota_domisili").focus();
                        alert("Kota Domisili Harus diisi");
                        return false;
                    }
                    var i1 = document.forms["data_entry_form"]["kelurahan_domisili"].value;
                    if (i1=="" || i1== null) {
                        document.getElementById("kelurahan_domisili").focus();
                        alert("Kelurahan Domisili  Harus diisi");
                        return false;
                    }
                    var j1 = document.forms["data_entry_form"]["kecamatan_domisili"].value;
                    if (j1=="" || j1== null) {
                        document.getElementById("kecamatan_domisili").focus();
                        alert("Kecamatan Domisili Harus diisi");
                        return false;
                    }
                    var k1 = document.forms["data_entry_form"]["kode_pos_domisili"].value;
                    if (k1=="" || k1== null) {
                        document.getElementById("kode_pos_domisili").focus();
                        alert("Kode Pos Harus diisi");
                        return false;
                    }
                }
        }
    </script>
    <!-- penutup validasi personal info -->

    <script>
        var idpeng=curef_id.value;
        // alert(idpeng);
    </script>

    <!-- hide show ktp -->
    <script>
        $("input[name='radioKtp']").click(function() {
        if ($("#chkInfoNo").is(":checked")) {
        $(".ktpPersonal").addClass("show-ktpPersonal");
        } else {
            $(".ktpPersonal").removeClass("show-ktpPersonal");
        }
        });

        const munculKtp = $("#buatKondisiKtp").val();
        if(munculKtp == "non"){
            $(".ktpPersonal").addClass("show-ktpPersonal");
        }else{
            $(".ktpPersonal").removeClass("show-ktpPersonal");
        }
    </script>
    <!-- akhir hide show ktp -->

    <!-- get data dukcapil untuk informasi data enty -->
    <script>
            $(document).ready(function(){
                //  AJAX request
                $.ajax({
                url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
                dataType: 'json',
                type: 'post',
                data: {ket: 'prov',provid: '0'},
                success: function(response){
                //console.log(response);
                $province = '';
                    $.each(response, function(i,n){
                        //console.log(n['kdWilayah']);
                        province = '<option value="'+n['kdWilayah']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                        province = province + '';
                        $('#provinsi_cabang').append(province);

                    });
                }});


                $("#provinsi_cabang").change(function(){
                var provid = $(this).val().substring(0,2);
                $.ajax({
                url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
                dataType: 'json',
                type: 'post',
                data: {ket: 'kabkota',provid: provid},
                success: function(response){
                //console.log(response);
                $kabkota = '';
                    $('#kabkota_cabang').empty();
                    kabkota = '<option value="">Pilih Kota</option>';
                         $('#kabkota_cabang').append(kabkota);
                    $.each(response, function(i,n){
                        //console.log('tes'+n['kdWilayah']);
                        kabkota = '<option value="'+n['kdWilayah']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                        kabkota = kabkota + '';
                        $('#kabkota_cabang').append(kabkota);
                    });



                }});});


                $("#kabkota_cabang").change(function(){
                var kabkotaid = $(this).val().substring(0,4);
                $.ajax({
                url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
                dataType: 'json',
                type: 'post',
                data: {ket: 'kecamatan',provid: kabkotaid},
                success: function(response){
                //console.log(response);
                $kecamatan = '';
                    $('#kecamatan').empty();
                    kecamatan = '<option value="">Pilih kecamatan</option>';
                         $('#kecamatan').append(kecamatan);
                    $.each(response, function(i,n){
                        //console.log(n['kdWilayah']);
                        kecamatan = '<option value="'+n['kdWilayah']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                        kecamatan = kecamatan + '';
                        $('#kecamatan').append(kecamatan);
                    });}});

                });

                $("#kecamatan").change(function(){
                var kecamatanid = $(this).val().substring(0,6);
                $.ajax({
                url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
                dataType: 'json',
                type: 'post',
                data: {ket: 'kelurahan',provid: kecamatanid},
                success: function(response){
                //console.log(response);
                $kelurahan = '';
                    $('#kelurahan').empty();
                    kelurahan = '<option value="">Pilih kecamatan</option>';
                         $('#kelurahan').append(kelurahan);
                    $.each(response, function(i,n){
                        //console.log(n['kdWilayah']);
                        kelurahan = '<option value="'+n['kdPos']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                        kelurahan = kelurahan + '';
                        $('#kelurahan').append(kelurahan);
                    });}});




                });



                $("#kelurahan").change(function(){
                var kelurahanid = $(this).val().substring(0,5);
                document.getElementById("kode_pos").value=(kelurahanid);



                });

            });



                function buatisi(){
                    var x = kode_pos.value;
                    $.ajax({
                // url: 'http://10.20.34.178:8087/efo/getWilByKdPos/' + x,
                url: '../data_entry/getTokenDukcapil',
                dataType: 'json',
                type: 'post',
                data: {
                        ket: 'kodpos',
                        provid: x,
                    },
                success: function (response) {
                    //console.log(response);
                    var da = JSON.parse(JSON.stringify(response))
                    //var result_ = JSON.parse(JSON.stringify(da.result))
                    var data_wilayah = JSON.parse(JSON.stringify(da.provKec))
                    var data_list_kelurahan = JSON.parse(JSON.stringify(da.kels))
                    console.log('data:'+data_list_kelurahan[0].kdWilayah);
                     $kelurahan = '';
                     $('#kelurahan').empty();
                    $.each(data_list_kelurahan, function (i, n) {
                            console.log(n['kdPos']);
                            if(n['kdPos'] == x){
                                console.log(n['namaWilayah']);
                            kelurahan = '<option value="' + n['kdPos'] + '|' + n['namaWilayah'] + '">' + n['namaWilayah'] + '</option>';
                            kelurahan = kelurahan + '';
                            $('#kelurahan').append(kelurahan);
                            }
                        });
                    var namaprov = data_wilayah.nm_prov;
                    var namakota = data_wilayah.nm_kota;
                    var namakecamatan = data_wilayah.nm_kec;
                    var namakelurahan = data_wilayah.nm_kel;
                    var kodeprov = data_wilayah.kd_prov;
                    var kodekota = data_wilayah.kd_kota;
                    var kodekecamatan = data_wilayah.kd_kec;
                    var kodekelurahan = data_wilayah.kd_kel;
                    $('#provinsi_cabang').attr('selected', 'selected').val(kodeprov + '|' + namaprov);
                    $('#provinsi_cabang option:first').text(namaprov);
                    $('#kabkota_cabang option:selected').val(kodekota + '|' + namakota);
                    $('#kabkota_cabang option:selected').text(namakota);
                    $('#kecamatan option:selected').val(kodekecamatan + '|' + namakecamatan);
                    $('#kecamatan option:selected').text(namakecamatan);
                   // $('#kelurahan option:first').val(x + '|' + namakelurahan);
                    //$('#kelurahan option:first').text(namakelurahan);



                }
            });



            }


            function buatisidomisili(){
                var x = kode_pos_domisili.value;
                $.ajax({
                // url: 'http://10.20.34.178:8087/efo/getWilByKdPos/' + x,
                url: '../data_entry/getTokenDukcapil',
                dataType: 'json',
                type: 'post',
                data: {
                        ket: 'kodpos',
                        provid: x,
                    },
                success: function (response) {
                    //console.log(response);
                    var da = JSON.parse(JSON.stringify(response))
                    //var result_ = JSON.parse(JSON.stringify(da.result))
                    var data_wilayah = JSON.parse(JSON.stringify(da.provKec))
                    var data_list_kelurahan = JSON.parse(JSON.stringify(da.kels))
                    console.log('data:'+data_list_kelurahan[0].kdWilayah);
                     $kelurahan = '';
                     $('#kelurahan_domisili').empty();
                    $.each(data_list_kelurahan, function (i, n) {
                            console.log(n['kdPos']);
                            if(n['kdPos'] == x){
                                console.log(n['namaWilayah']);
                            kelurahan = '<option value="' + n['kdPos'] + '|' + n['namaWilayah'] + '">' + n['namaWilayah'] + '</option>';
                            kelurahan = kelurahan + '';
                            $('#kelurahan_domisili').append(kelurahan);
                            }
                        });
                    var namaprov = data_wilayah.nm_prov;
                    var namakota = data_wilayah.nm_kota;
                    var namakecamatan = data_wilayah.nm_kec;
                    var namakelurahan = data_wilayah.nm_kel;
                    var kodeprov = data_wilayah.kd_prov;
                    var kodekota = data_wilayah.kd_kota;
                    var kodekecamatan = data_wilayah.kd_kec;
                    var kodekelurahan = data_wilayah.kd_kel;
                    $('#provinsi_domisili').attr('selected', 'selected').val(kodeprov + '|' + namaprov);
                    $('#provinsi_domisili option:first').text(namaprov);
                    $('#kabkota_domisili option:selected').val(kodekota + '|' + namakota);
                    $('#kabkota_domisili option:selected').text(namakota);
                    $('#kecamatan_domisili option:selected').val(kodekecamatan + '|' + namakecamatan);
                    $('#kecamatan_domisili option:selected').text(namakecamatan);
                //    $('#kelurahan_domisili option:first').val(x + '|' + namakelurahan);
                //     $('#kelurahan_domisili option:first').text(namakelurahan);



                }
            });



            }
    </script>
    <!-- penutup get data dukcapil untuk informasi data entry -->

    <!-- get data dukcapil untuk domisili -->
    <script>
        // var gimmeCats = () => {
        //   window.location.href = "<?=base_url()."data_entry/getjobde"?>";
        // }

        $(document).ready(function(){
            //  AJAX request
            $.ajax({
            url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
            dataType: 'json',
            type: 'post',
            data: {ket: 'prov',provid: '0'},
            success: function(response){
            //console.log(response);
            $province = '';
                $.each(response, function(i,n){
                    console.log(n['kdWilayah']);
                    province = '<option value="'+n['kdWilayah']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                    province = province + '';
                    $('#provinsi_domisili').append(province);

                });
            }});


            $("#provinsi_domisili").change(function(){
            // var provid ='31'
            var provid = $(this).val().substring(0,2);
            $.ajax({
            url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
            dataType: 'json',
            type: 'post',
            data: {ket: 'kabkota',provid: provid},
            success: function(response){
            //console.log(response);
            $kabkota = '';
                $('#kabkota_domisili').empty();
                kabkota = '<option value="">Pilih Kota</option>';
                         $('#kabkota_domisili').append(kabkota);
                $.each(response, function(i,n){
                    console.log('tes'+n['kdWilayah']);
                    kabkota = '<option value="'+n['kdWilayah']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                    kabkota = kabkota + '';
                    $('#kabkota_domisili').append(kabkota);
                });



            }});});


            $("#kabkota_domisili").change(function(){
            var kabkotaid = $(this).val().substring(0,4);
            // var kabkotaid='3172'
            $.ajax({
            url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
            dataType: 'json',
            type: 'post',
            data: {ket: 'kecamatan',provid: kabkotaid},
            success: function(response){
            //console.log(response);
            $kecamatan = '';
                $('#kecamatan_domisili').empty();
                kecamatan = '<option value="">Pilih Kecamatan</option>';
                         $('#kecamatan_domisili').append(kecamatan);
                $.each(response, function(i,n){
                    console.log(n['kdWilayah']);
                    kecamatan = '<option value="'+n['kdWilayah']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                    kecamatan = kecamatan + '';
                    $('#kecamatan_domisili').append(kecamatan);
                });}});

            });

            $("#kecamatan_domisili").change(function(){
            var kecamatanid = $(this).val().substring(0,6);
            $.ajax({
            url: 'http://10.20.82.153:8080/new-efos/data_entry/getTokenDukcapil',
            dataType: 'json',
            type: 'post',
            data: {ket: 'kelurahan',provid: kecamatanid},
            success: function(response){
            //console.log(response);
            $kelurahan = '';
                $('#kelurahan_domisili').empty();
                kelurahan = '<option value="">Pilih Kecamatan</option>';
                         $('#kelurahan_domisili').append(kelurahan);
                $.each(response, function(i,n){
                    console.log(n['kdWilayah']);
                    kelurahan = '<option value="'+n['kdPos']+'|'+n['namaWilayah']+'">'+n['namaWilayah']+'</option>';
                    kelurahan = kelurahan + '';
                    $('#kelurahan_domisili').append(kelurahan);
                });}});




            });



            $("#kelurahan_domisili").change(function(){
            var kelurahanid = $(this).val().substring(0,5);
            document.getElementById("kode_pos_domisili").value=(kelurahanid);



            });

        });
    </script>
    <!-- akhir get data dukcapil untuk informasi data entry -->

    <!-- buat hide kendaraan -->
    <script>
        document.getElementById('status_kendaraan').addEventListener('change', function(){
            if (this.value == 1)
            $("#hidden_tipe_kendaraan").show();
            else if(this.value == 2)
            $("#hidden_tipe_kendaraan").hide();
        });
    </script>
    <!-- buat hide kendasraan -->

    <!-- untuk alamat sama dengan pemohon -->
    <script>
        $("#iyaSama").click(function () {
            // alert('hsh ')
            var alamatSamaPer = $('#alamat_ktp').val();
            var alamatDom = document.getElementById('alamat_domisili');
            alamatDom.value = alamatSamaPer;
            optionText = $('#provinsi_cabang option:selected').val();
            optionText2 = $('#kabkota_cabang option:selected').val();
            optionText3 = $('#kecamatan option:selected').val();
            optionText4 = $('#kelurahan option:selected').val();

            $('#provinsi_domisili').append(`<option selected>${optionText}</option>`);
            $('#kabkota_domisili').append(`<option selected>${optionText2}</option>`);
            $('#kecamatan_domisili').append(`<option selected>${optionText3}</option>`);
            $('#kelurahan_domisili').append(`<option selected>${optionText4}</option>`);
            if (this.checked) {
                $('#kode_pos_domisili').val($('#kode_pos').val());
                $('#rt_domisili').val($('#rt').val());
                $('#rw_domisili').val($('#rw').val());
            }
        });
    </script>
    <!-- untuk alamat sama dengan pemohon -->
    <!-- buat retrive status kendaraan -->
    <script>
        var stKe = $("#status_kendaraan").val();
        // alert(stKe)
        if(stKe == 1)
        $("#hidden_tipe_kendaraan").show();
        else
        $("#hidden_tipe_kendaraan").hide();
    </script>
    <!-- buat retrive status kendaraan -->

    <!-- buat biar inpunya number -->
    <script>

        $(document).ready(function(){
        var grupname=WADUH.value;
        // var grupname=$this->session->userdata('GROUP_NAME');
        // alert(grupname);
        if(grupname=="BRANCHMANAGER"){
            $('#nama').attr('readonly', 'readonly');
            $('#jenis_kelamin').attr('disabled', 'disabled');
            $('#tanggal_lahir').attr('readonly', 'readonly');
            $('#tempat_lahir').attr('readonly', 'readonly');
            $('#status_perkawinan').attr('readonly', 'readonly');
            $('#agama').attr('disabled', 'disabled');
            $('#pendidikan').attr('disabled', 'disabled');
            $('#status_rumah').attr('disabled', 'disabled');
            $('#no_handphone').attr('readonly', 'readonly');
            $('#no_telepon').attr('readonly', 'readonly');
            $('#no_ktp').attr('readonly', 'readonly');
            $('#email').attr('readonly', 'readonly');
            $('#alamat_ktp').attr('readonly', 'readonly');
            $('#kewarganegaraan').attr('disabled', 'disabled');
            $('#provinsi_cabang').attr('disabled', 'disabled');
            $('#kabkota_cabang').attr('disabled', 'disabled');
            $('#kecamatan').attr('disabled', 'disabled');
            $('#kelurahan').attr('disabled', 'disabled');
            $('#rt').attr('readonly', 'readonly');
            $('#rw').attr('readonly', 'readonly');
            $('#kode_pos').attr('readonly', 'readonly');
            $('#tanggal_terbit_ktp').attr('readonly', 'readonly');
            $('#jumlah_anak').attr('readonly', 'readonly');
            $('#lama_menetap').attr('readonly', 'readonly');
            $('#status_kendaraan').attr('disabled', 'disabled');
            $('#alamat_domisili').attr('readonly', 'readonly');
            $('#rt_domisili').attr('readonly', 'readonly');
            $('#rw_domisili').attr('readonly', 'readonly');
            $('#provinsi_domisili').attr('disabled', 'disabled');
            $('#kabkota_domisili').attr('disabled', 'disabled');
            $('#kecamatan_domisili').attr('disabled', 'disabled');
            $('#kelurahan_domisili').attr('disabled', 'disabled');
            $('#kode_pos_domisili').attr('readonly', 'readonly');
            $('#usia').attr('readonly', 'readonly');
            $('#npwp').attr('readonly', 'readonly');
            $('#provinsi_domisili').attr('disabled', 'disabled');
            $('#btn').attr('hidden', 'hidden');
            $('#chkInfoYes').attr('disabled', 'disabled');
            $('#chkInfoNo').attr('disabled', 'disabled');
            $('#btn_cari').attr('disabled', 'disabled');
            $('#tipe_kendaraan').attr('disabled', 'disabled');
            $('#iyaSama').attr('disabled', 'disabled');
            $('#takSama').attr('disabled', 'disabled');
            $('#tanggal_exp_ktp').attr('disabled', 'disabled');
            $('#kode_pos_domisilihilang').attr('hidden', 'hidden');
            $('#kode_poshilang').attr('hidden', 'hidden');
            // a = document.getElementById("nama").value;
            // a.readonly=true;
            // alert(a);
        }else{
            $('#btn_selanjutnya').attr('hidden', 'hidden');
        }


            })

            function onlyNumberKey(evt) {
                var ASCIICode = (evt.which) ? evt.which : evt.keyCode
                if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                    return false;
                return true;
            }

    </script>

    <script>

        $(document).ready(function(){

        //  AJAX request
        $.ajax({
        url: 'http://10.20.82.153:8080/new-efos/data_entry/getstatusrumah',
        dataType: 'json',
        type: 'post',
        success: function(response){
        //console.log(response);
        $province = '';
            $.each(response, function(i,n){
                console.log(n['deskripsi']);
                province = '<option value="'+n['code']+'">'+n['description']+'</option>';
                province = province + '';
                $('#status_rumah').append(province);

            });
        }});


        });
    </script>


<script>
//// untuk kendaraan ////

$(document).ready(function(){

$.ajax({
url: 'http://10.20.82.153:8080/new-efos/data_entry/gettipekendaraan',
dataType: 'json',
type: 'post',
success: function(response){
//console.log(response);
$province = '';
      $.each(response, function(i,n){
          console.log(n['deskripsi']);
          province = '<option value="'+n['deskripsi']+'">'+n['deskripsi']+'</option>';
          province = province + '';
          $('#tipe_kendaraan').append(province);

      });
}});


});

</script>



<script>
        $(document).ready(function(){
        //  AJAX request
        $.ajax({
            url: 'http://10.20.82.153:8080/new-efos/data_entry/getstatusperkawinan',
        dataType: 'json',
        type: 'post',
        success: function(response){
        console.log(response);
        $province = '';
        // $('#status_perkawinan').empty();
        // province = '<option value="">Pilih tipe status </option>';
        //                         $('#status_perkawinan').append(province);
            $.each(response, function(i,n){
                console.log(n['deskripsi']);
                province = '<option value="'+n['kode']+'">'+n['deskripsi']+'</option>';
                province = province + '';
                $('#status_perkawinan').append(province);

            });
        }});
        });
    </script>

    <!-- buat biar inpunya number -->
</body>

</html>
