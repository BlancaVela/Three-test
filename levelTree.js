function GetTree( )
{
	var users	= [];
	var blogs		= [];
	var comm	= [];
	var all		= {};

	var temporalb;
	var temporalc;

	var request = $.ajax({
		url: "http://localhost/pruebas/data.json",
		method: "POST",
		cache: false,
		dataType: "json"
	});

	request.done(function( result ) {

		for( var i in result )
		{
			if( result[i]._entity == "User" )
			{
				users.push( result[i] );
				temporalb = result[i].blogs;
				users[i].blogs = [];

				if( temporalb != "undefined" )
				{
					for( var j in temporalb )
					{
						blogs.push( temporalb[j] );
						temporalc = temporalb[j].comments;

						blogs[ blogs.length - 1 ].userId = temporalb[j].user.id;
						delete blogs[ blogs.length - 1 ].comments;
						delete blogs[ blogs.length - 1 ].user;

						for( var k in temporalc )
						{
							comm.push( temporalc[k] );
							comm[ comm.length - 1 ].userId = temporalc[k].user.id;

							delete comm[ comm.length - 1 ].user;
						}
					}
				}
			}
		}

		all["Users"]		= users;
		all["blogs"]		= blogs;
		all["Comments"]	= comm;

		console.log( JSON.stringify( all ) );
	});

	request.fail(function( jqXHR, textStatus, errorThrown ) {

		console.log( errorThrown + "\n" + jqXHR.responseText );

	});
}

