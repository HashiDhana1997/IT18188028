const user = JSON.parse(localStorage.getItem('user'));
var sessions = [];
$(document).ready(
		
		function() {
			$('#btn_submit').show();
			$('#btn_update').hide();
			$('#btn_cancel').hide();
			var days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday',
					'Thursday', 'Friday', 'Saturday' ];

			for (var i = 0; i < days.length; i++) {
				$('#day_select').append(
						' <option value="' + days[i].toUpperCase() + '">'
								+ days[i] + '</option>');
				$('#new_day_select').append(
						' <option value="' + days[i].toUpperCase() + '">'
								+ days[i] + '</option>');
			}
			getSessions()
		});

function createNew() {
	 
	var day = $('#new_day_select').val();
	var maxCount = $('#new_max_count').val();
	var description = $('#new_description').val();
	var price = $('#new_price').val();
	$.ajax({
		type : "POST",
		url : '/hc/api/doctors/crete-session',
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},
		data : JSON.stringify({
			day : day,
			maxCount : maxCount,
			doctorId : user.id,
			description : description,
			price : price
		}),
		success : function(data) {
			if (data.status) {
				alert('Session created');
				getSessions();
			}
		}
	});

}
function del(id) {
	debugger
	$.ajax({
		type : "DELETE",
		url : '/hc/api/doctors/delete/' + id,
		dataType : 'json',
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},
		success : function(data) {

			if (data.status) {
				alert('Session created');
				getSessions();
			}
		}
	});
}
function update(id) {
	for (var i = 0; i < sessions.length; i++) {
		var d = sessions[i];
		if (d.id == id) {
			$('#id').val(d.id);
			$('#new_day_select').val(d.day);
			$('#new_max_count').val(d.maxCount);
			$('#new_description').val(d.description);
			$('#new_price').val(d.price);
			$('#btn_submit').hide();
			$('#btn_update').show();
			$('#btn_cancel').show();
		}
	}
}
function doUpdate(){
	var day = $('#new_day_select').val();
	var maxCount = $('#new_max_count').val();
	var description = $('#new_description').val();
	var price = $('#new_price').val();
	var id=$('#id').val();
	$.ajax({
		type : "PUT",
		url : '/hc/api/doctors/update/'+id,
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},
		data : JSON.stringify({
			id:id,
			day : day,
			maxCount : maxCount,
			doctorId : user.id,
			description : description,
			price : price
		}),
		success : function(data) {
			if (data.status) {
				alert('Updated');
				getSessions();
			}
		}
	});
}

function cancel(){
	$('#btn_submit').show();
	$('#btn_update').hide();
	$('#btn_cancel').hide();
}
function getSessions() {

	var day = $('#day_select').val();
	$
			.ajax({
				type : "GET",
				url : '/hc/api/doctors/sessions/' + user.id + '/' + day,
				dataType : 'json',
				headers : {
					"Authorization" : "Basic "
							+ btoa(localStorage.getItem('username') + ":"
									+ localStorage.getItem('password'))
				},
				success : function(data) {
					sessions = data;
					$('#table_container').empty();
					const tds = '<tr>' + '<th> @id </th>' + '<th> @day </th>'
							+ '<th> @maxCount </th>'
							+ '<th> @description </th>' + '<th> @price </th>'
							+ '<th> @action </th>' + '</tr>';
					const btnUpdate = '<button type="button" style="margin:5px" class="btn btn-warning" onClick="update( @id )">Update</button>';
					const btnDelete = '<button type="button" style="margin:5px" class="btn btn-danger" onClick="del( @id )">Delete</button>';
					for (var i = 0; i < data.length; i++) {
						var d = data[i];
						var actions = btnUpdate.replace('@id', d.id)
								+ btnDelete.replace('@id', d.id);
						var tr = tds.replace('@id', d.id)
								.replace('@day', d.day).replace('@maxCount',
										d.maxCount).replace('@description',
										d.description).replace('@price',
										d.price).replace('@action', actions)

						$('#table_container').append(tr);
					}

				}
			});

}