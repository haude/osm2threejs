#!/usr/bin/env python3

from lxml import etree
import math, sys

def latlon2xy(lat, lon):
    x=(lon+180.0)/360.0
    sinlat=math.sin(math.radians(lat))
    y=math.log((1+sinlat)/(1-sinlat))/4*math.pi + 0.5
    print('"x":', x, end=", ")
    print('"z":', y, end=", ")


def main():
    root = etree.parse(FILE+".osm")
    i=0
    for child in root.iter():
        k=child.get('k')
        if k == None: continue
        if k != "name": continue

        parent=child.getparent()

        lat=parent.get('lat')
        lon=parent.get('lon')
        if lat == None or lon == None: continue

        if i != 0:
            print(end=",\n")

        i+=1
        print('{"', end="")
        print(child.get('k'), end="\": \"")
        print(child.get('v'), end="\", ")
        # latlon2xy(float(lat), float(lon))
        print('"lat"', parent.get('lat'), sep=": " , end=", ")
        print('"lon"', parent.get('lon'), sep=": ", end="}")

if __name__ == '__main__':
    if len(sys.argv)<2:
        print("Argument(s) Missing", file=sys.stderr); exit(1);


    FILE=sys.argv[1]
    get=open(FILE+'.obj').read().splitlines()

    print("[{", end='"name": "", ')
    i=0
    for line in get:
        i+=1
        split=line.split()
        if not split: continue
        if split[1] != "Coordinate": continue

        if split[4] == "lat":
            print('"', split[4], '": ', split[5], end=" ", sep="")
            print('"', split[6], '": ', split[7].rstrip(','), end="},\n", sep="")
            break
        if i == 5: break
    main()
    print("]")
