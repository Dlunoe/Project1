$(document).ready(function(){

$('.searchButton').on("click",function(){
    event.preventDefault();
    var searchFor=$('.searchBox').val().toLowerCase();
    //if the user searches a type
    if (searchFor=="water"||searchFor=="fire"||searchFor=="grass"||searchFor=="electric"||searchFor=="psychic"||searchFor=="ice"||searchFor=="ice"||searchFor=="dragon"||searchFor=="dark"||searchFor=="fairy"||searchFor=="normal"||searchFor=="fighting"||searchFor=="flying"||searchFor=="poison"||searchFor=="ground"||searchFor=="rock"||searchFor=="bug"||searchFor=="ghost"||searchFor=="steel"){
        console.log("type searched")
        $.ajax({
        url:`https://pokeapi.co/api/v2/type/${searchFor}`,
        success:(data)=>{
            //appends search results as buttons
            for(i=0;i<20;i++){
            
            $('.searchResults').append(`<li><input type="button" class="search" value="${data.pokemon[i].pokemon.name}"></input></li>`)
            }
            $('.searchResults').append('<input type="button" value="Next Page" class="nextButton"></input>')
            $('.nextButton').on("click", function(e){
               //clicking next will bring up the next 20 results
                for(i=i;i<i+20;i++){                   
                    $('.searchResults').append(`<li><input type="button" class="search" value="${data.pokemon[i].pokemon.name}"></input></li>`)
                    }
            })
            //same code as seaching for a name, but uses the button to input a name instead of a search box.
            $('.search').on("click", function(e){
                event.preventDefault();
                searchFor=(this.value);
                        $.ajax({
                        url:`https://pokeapi.co/api/v2/pokemon/${searchFor}`,
                        success:(data)=>{
                            console.log(data);
                            var sprite=data.sprites.front_default;
                            var spriteBack=data.sprites.back_default;
                            $('.name').text(data.species.name)
                            $('.sprite').html(`<img src=${sprite}>`)
                            $('.sprite2').html(`<img src=${spriteBack}>`)
                            $('.types').empty();
                            $('.types').append(`<li>${data.types[0].type.name}</li>`)
                                if(data.types[1].type.name!==undefined){
                                $('.types').append(`<li>${data.types[1].type.name}</li>`)
                                }
                
                        },
                        error:()=>{
                            console.log("bad request")
                        }
                
                        })
                        $.ajax({
                        url:`https://pokeapi.co/api/v2/pokemon-species/${searchFor}`,
                        success:(data)=>{
                            console.log(data)
                            var flavorText = "";
                            for(i=0;i<data.flavor_text_entries.length;i++){
                                if(data.flavor_text_entries[i].language.name=="en"){
                                    flavorText=data.flavor_text_entries[i].flavor_text;
                                    $('.flavorText').text(flavorText);
                                    return true
                                }
                            }
                        },
                        error:()=>{
                            console.log("bad request")
                        }
                        })
                

            })
        },
        error:()=>{
            console.log("bad request")
        }
    })
    
    //if the user searches a name
    }else{
    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${searchFor}`,
        success:(data)=>{
            console.log(data);
            var sprite=data.sprites.front_default;
            var spriteBack=data.sprites.back_default;
            $('.name').text(data.species.name)
            $('.sprite').html(`<img src=${sprite}>`)
            $('.sprite2').html(`<img src=${spriteBack}>`)
            $('.types').empty();
            $('.types').append(`<li>${data.types[0].type.name}</li>`)
                if(data.types[1].type.name!==undefined){
                $('.types').append(`<li>${data.types[1].type.name}</li>`)
                }

        },
        error:()=>{
            console.log("bad request")
        }

    })
    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon-species/${searchFor}`,
        success:(data)=>{
            console.log(data)
            var flavorText = "";
            for(i=0;i<data.flavor_text_entries.length;i++){
                if(data.flavor_text_entries[i].language.name=="en"){
                    flavorText=data.flavor_text_entries[i].flavor_text;
                    $('.flavorText').text(flavorText);
                    return true
                }
            }
        },
        error:()=>{
            console.log("bad request")
        }
    })
}
    
    })


})