//
// サーバのメール送付APIでメールを送る
//
function mailsend(to,subject,body){
    $.ajax({
	type: "POST",
	url: "http://192.168.0.200/mail",
	data: {
	    to: to,
	    subject: subject,
	    body: body
	},
	success: function(msg){
	    console.log(`Message sent to ${to}`);
	}
    });
}
