/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Blockchain example
// ===========================

$(document).ready(function() {
  $("button.dataSet").click(function(e) {
    e.preventDefault();
    var topic_value = $(".inputTopic").val();
    addToLog("#blockchain", "value(" + topic_value + ")");
    var input_file = $(".userUploadFile");
    EmbarkJS.Storage.uploadFile(input_file).then(function(input_file_hash) {
      console.log("topic_value", topic_value);
      console.log("input_file_hash", input_file_hash);
      $("span.userFileIpfsHash").html(input_file_hash);
      $("input.fileIpfsHash").val(input_file_hash);
      EthPic.add_data(input_file_hash, topic_value, {gas: 1050000});
    });
  });
  /// this is just a hack to get it working, talking about ind_user
  var ind_user = 0;
  $("button.userGet").click(function() {
      EthPic.get_user(ind_user).then(function(pic_hash) {
        console.log(pic_hash);
      });
      ind_user += 1;
  });
  var ind_topic = 0;
  $("button.topicGet").click(function() {
    var topic_value = $(".inputTopic").val();
    console.log(ind_topic);
      EthPic.get_topic(topic_value, ind_topic).then(function(pic_hash) {
        console.log(pic_hash);
      });
      ind_topic += 1;
  });
  $("button.photoDel").click(function() {
    var topic_value = $(".inputTopic").val();
    var photoHash = $(".photoHash").val();
      EthPic.del_photo(photoHash, topic_value, {gas: 1050000});
      ind_topic = 0;
      ind_user = 0;
  });

});

$(document).ready(function() {

  $("#blockchain button.set").click(function() {
    var value = parseInt($("#blockchain input.text").val(), 10);
    EthPic.add_data(value, value, value, value);
    addToLog("#blockchain", "SimpleStorage.set(" + value + ")");
  });

  $("#blockchain button.get").click(function() {
    EthPic.addr().then(function(value) {
      $("#blockchain .value").html(value);
    });
    addToLog("#blockchain", "SimpleStorage.get()");
  });


  EmbarkJS.Storage.setProvider('ipfs',{server: '139.59.72.137', port: '5001'});

  $("#storage button.setIpfsText").click(function() {
    var value = $("#storage input.ipfsText").val();
    EmbarkJS.Storage.saveText(value).then(function(hash) {
      $("span.textHash").html(hash);
      $("input.textHash").val(hash);
    });
    addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  });

  $("#storage button.loadIpfsHash").click(function() {
    var value = $("#storage input.textHash").val();
    EmbarkJS.Storage.get(value).then(function(content) {
      $("span.ipfsText").html(content);
    });
    addToLog("#storage", "EmbarkJS.Storage.get('" + value + "').then(function(content) { })");
  });

  $("#storage button.uploadFile").click(function() {
    var input = $("#storage input[type=file]");
    console.log(input);
    EmbarkJS.Storage.uploadFile(input).then(function(hash) {
      $("span.fileIpfsHash").html(hash);
      $("input.fileIpfsHash").val(hash);
    });
    addToLog("#storage", "EmbarkJS.Storage.uploadFile($('input[type=file]')).then(function(hash) { })");
  });

  $("#storage button.loadIpfsFile").click(function() {
    var hash = $("#storage input.fileIpfsHash").val();
    var url = EmbarkJS.Storage.getUrl(hash);
    var link = '<a href="' + url + '" target="_blank">' + url + '</a>';
    $("span.ipfsFileUrl").html(link);
    $(".ipfsImage").attr('src', url);
    addToLog("#storage", "EmbarkJS.Storage.getUrl('" + hash + "')");
  });

});
