<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-3.5.0.min.js"
	integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
	integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
	crossorigin="anonymous">
</head>
<body>

	<section id="new_container">
		<h2>Create New Session</h2>
		<input type="hidden" id="id">
		<div class="form-group">
			<label>Day</label> <select id="new_day_select"></select>
		</div>
		<div class="form-group">
			<label>Max count</label> <input type="number" id="new_max_count">
		</div>
		<div class="form-group">
			<label>Description</label> <input type="text" id="new_description">
		</div>
		<div class="form-group">
			<label>Price</label> <input type="number" id="new_price">
		</div>
		<button type="button" onclick="createNew()" id="btn_submit" class="btn btn-primary">Submit</button>
		<button type="button" onclick="doUpdate()" id="btn_update" class="btn btn-primary">Update</button>
		<button type="button" onclick="cancel()" id="btn_cancel" class="btn btn-danger">Cancel</button>
	</section>
	<section id="update_container"></section>



	<hr>
	<div class="form-group">
		<label>Day</label> <select id="day_select" onchange="getSessions()">
		</select>
	</div>

	<table class="table" style="width: 900px">
		<thead>
			<tr>
				<th>#</th>
				<th>Day</th>
				<th>Max Count</th>
				<th>Description</th>
				<th>Price</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody id="table_container">
		</tbody>
	</table>

	<script src="sessions.js"></script>
</body>
</html>