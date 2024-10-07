
def car():
    return "pinocho"
def pc(info):
    print(info.fromUrl())
    
def pc2(info):
    print(info.fromUrl())
    return "sda"
def test(info):
    print("hola3123")
    print(info.fromBody())
    return "caqita"
def test2(info):
    print(info.fromBody())

GETroutes={
    "/car":car,
    "/cacatua":pc,
    "/cacatua2":pc2
}

POSTroutes={
    "/test_post":test,
    "/test_post2":test2
}