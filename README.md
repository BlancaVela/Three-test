

# Proccessing serialized information (Tree)
### Introduction
The company handles a lot of related information and and we need to focus on making high performance applications and services and sometimes we need to handle large amounts of nested information that need to be cataloged for storage, this allow us to reuse it in components, requests etc.
### Objective
To process information in the graph and catalog the information in a data store (can be an array). This is for us to know how you would handle a graph or tree of entities related to each other for easy storage and making a cache of all the information in a flat form (database like).
## The Problem

You have received a server response in JSON format that contains an array of users and their blog posts
and for each blog post, contains comments and that comment belongs to a user which is contained in the comment.

#### Response map:

 - Users (each)
     --Each User Has Many Blogs
         ------ Each Blog Has many Comments
             ---------- Each Comment has a User
    
#### Response:
```JSON
[
  {
    "_entity": "User",
    "id": 1,
    "firstName": "Leonel",
    "lastName": "Gomez",
    "age": 27,
    "blogs": [
      {
      "user": {
        "_entity": "User",
        "id": 1,
        "firstName": "Leonel",
        "lastName": "Gomez",
        "age": 27
      },
        "_entity": "Blog",
        "id": 231,
        "title": "La programacion y tu",
        "body": "Prepared do an dissuade be so whatever steepest. Yet her beyond looked either day wished nay. By doubtful disposed do juvenile an. Now curiosity you explained immediate why behaviour. An dispatched impossible of of melancholy favourable. Our quiet not heart along scale sense timed. Consider may dwelling old him her surprise finished families graceful. Gave led past poor met fine was new.",
        "comments": [
          {
            "_entity": "Comment",
            "id": 321,
            "body": "wew lad",
            "user": {
              "_entity": "User",
              "id": 3,
              "firstName": "Salvador",
              "lastName": "Briones",
              "age": 22
            }
          },
          {
            "_entity": "Comment",
            "id": 21334,
            "body": "foo bar",
            "user": {
              "_entity": "User",
              "id": 2,
              "firstName": "Diego",
              "lastName": "Meza",
              "age": 22
            }
          }
        ]
      }
    ]
  },
  {
    "_entity": "User",
    "id": 2,
    "firstName": "Diego",
    "lastName": "Meza",
    "age": 27,
    "blogs": [
      {
        "_entity": "Blog",
        "id": 832,
        "title": "Wisdom",
        "body": "By an outlived insisted procured improved am. Paid hill fine ten now love even leaf. Supplied feelings mr of dissuade recurred no it offering honoured. Am of of in collecting devonshire favourable excellence. Her sixteen end ashamed cottage yet reached get hearing invited. Resources ourselves sweetness ye do no perfectly. Warmly warmth six one any wisdom. Family giving is pulled beauty chatty highly no. Blessing appetite domestic did mrs judgment rendered entirely. Highly indeed had garden not.",
        "user": {
          "_entity": "User",
          "id": 2,
          "firstName": "Diego",
          "lastName": "Meza",
          "age": 27
        },
        "comments": [
          {
            "_entity": "Comment",
            "id": 563,
            "body": "very nice",
            "user": {
              "_entity": "User",
              "id": 1,
              "firstName": "Leonel",
              "lastName": "Gomez",
              "age": 27
            }
          },
          {
            "_entity": "Comment",
            "id": 868,
            "body": "foo bar baz",
            "user": {
              "_entity": "User",
              "id": 3,
              "firstName": "Salvador",
              "lastName": "Briones",
              "age": 22
            }
          }
        ]
      },
      {
        "_entity": "Blog",
        "id": 647,
        "title": "Admiration",
        "body": "Admiration stimulated cultivated reasonable be projection possession of. Real no near room ye bred sake if some. Is arranging furnished knowledge agreeable so. Fanny as smile up small. It vulgar chatty simple months turned oh at change of. Astonished set expression solicitude way admiration. ",
        "user": {
          "_entity": "User",
          "id": 2,
          "firstName": "Diego",
          "lastName": "Meza",
          "age": 27
        },
        "comments": [
          {
            "_entity": "Comment",
            "id": 957,
            "body": "cool story bro",
            "user": {
              "_entity": "User",
              "id": 1,
              "firstName": "Leonel",
              "lastName": "Gomez",
              "age": 27
            }
          },
          {
            "_entity": "Comment",
            "id": 545,
            "body": "step up nibba",
            "user": {
              "_entity": "User",
              "id": 3,
              "firstName": "Salvador",
              "lastName": "Briones",
              "age": 22
            }
          }
        ]
      }
    ]
  },
  {
    "_entity": "User",
    "id": 3,
    "firstName": "Salvador",
    "lastName": "Briones",
    "age": 22,
    "blogs": []
  }
]
```
## What is expected

It is expected that you can walk the graph and catalog each entity in a store, it can be an array for each type of entity. In other words we expect you to "Flatten" the three structure and keep unique records for each entity type (no repeat).

#### Note: Properties that represent a "has many" relationship can be set to an empty array or skip that property, check the example below.

### Example output
```JSON
{
    "Users": [
        {
            "_entity": "User",
            "id": 1,
            "firstName": "Leonel",
            "lastName": "Gomez",
            "age": 27,
            "blogs": []
        },
        {
            "_entity": "User",
            "id": 2,
            "firstName": "Diego",
            "lastName": "Meza",
            "age": 27,
            "blogs": []
        },
        {
            "_entity": "User",
            "id": 3,
            "firstName": "Salvador",
            "lastName": "Briones",
            "age": 22,
            "blogs": []
        }
    ],

    "blogs": [
        {
            "_entity": "Blog",
            "id": 231,
            "userId": 1,
            "title": "La programacion y tu",
            "body": "Prepared do an dissuade be so whatever steepest. Yet her beyond looked either day wished nay. By doubtful disposed do juvenile an. Now curiosity you explained immediate why behaviour. An dispatched impossible of of melancholy favourable. Our quiet not heart along scale sense timed. Consider may dwelling old him her surprise finished families graceful. Gave led past poor met fine was new."
        },
        {
            "_entity": "Blog",
            "id": 832,
            "title": "Wisdom",
            "body": "By an outlived insisted procured improved am. Paid hill fine ten now love even leaf. Supplied feelings mr of dissuade recurred no it offering honoured. Am of of in collecting devonshire favourable excellence. Her sixteen end ashamed cottage yet reached get hearing invited. Resources ourselves sweetness ye do no perfectly. Warmly warmth six one any wisdom. Family giving is pulled beauty chatty highly no. Blessing appetite domestic did mrs judgment rendered entirely. Highly indeed had garden not."
        },
        {
            "_entity": "Blog",
            "id": 647,
            "title": "Admiration",
            "body": "Admiration stimulated cultivated reasonable be projection possession of. Real no near room ye bred sake if some. Is arranging furnished knowledge agreeable so. Fanny as smile up small. It vulgar chatty simple months turned oh at change of. Astonished set expression solicitude way admiration. "
        }
    ],

    "Comments": [
        {
            "_entity": "Comment",
            "id": 321,
            "blogId": 231,
            "body": "wew lad",
            "userId": 3
        },
        {
            "_entity": "Comment",
            "id": 21334,
            "blogId": 231,
            "body": "foo bar",
            "userId": 2
        },
        {
            "_entity": "Comment",
            "id": 563,
            "blogId": 832,
            "userId": 1,
            "body": "very nice"
        },
        {
            "_entity": "Comment",
            "id": 868,
            "blogId": 832,
            "body": "foo bar baz",
            "userId": 3
        },
        {
            "_entity": "Comment",
            "id": 957,
            "blogId": 647,
            "body": "cool story bro",
            "UserId": 1
        },
        {
            "_entity": "Comment",
            "id": 545,
            "blogId": 647,
            "body": "step up nibba",
            "userId": 3
        }
    ]
}
```

--------
