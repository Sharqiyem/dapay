const Logo = ({ props }: { props?: React.SVGProps<SVGSVGElement> }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={96} height={48} viewBox="0 0 96 48" {...props}>
    <g
      //   transform="translate(0.000000,112.000000) scale(0.100000,-0.100000)"
      fill="none"
      className="fill-primary"
      stroke="none"
    >
      <path
        d="M555 1066 c31 -41 33 -39 -68 -56 -38 -6 -92 -21 -122 -35 -42 -18
-55 -20 -59 -10 -3 8 -2 15 3 17 4 2 1 14 -6 28 l-13 25 0 -33 c0 -20 -4 -31
-10 -27 -5 3 -10 18 -10 33 l0 26 -33 -32 c-18 -18 -36 -30 -38 -27 -3 3 -16
-7 -30 -22 -22 -25 -22 -26 -1 -9 12 11 22 15 22 10 0 -13 -65 -76 -72 -69 -2
3 -13 -5 -24 -17 l-19 -23 23 19 c12 11 22 14 22 8 0 -7 10 -12 23 -12 18 0
29 -11 47 -50 13 -27 25 -50 28 -50 2 0 22 19 44 43 46 50 40 30 -11 -31 l-35
-42 -22 42 -21 42 -20 -39 c-11 -22 -28 -64 -38 -93 -17 -53 -17 -54 4 -76 27
-29 27 -60 -1 -88 l-21 -21 21 -72 c12 -40 19 -83 17 -95 l-4 -23 27 24 c15
13 28 27 30 31 8 18 71 -18 116 -67 32 -34 60 -55 73 -55 12 0 26 -6 30 -13
21 -36 197 -53 223 -22 7 9 21 13 35 9 32 -8 109 32 101 52 -3 9 -6 17 -6 19
0 2 -26 -10 -57 -26 -37 -18 -81 -32 -120 -36 l-63 -6 -2 69 c-1 56 -2 60 -5
21 -4 -46 -5 -47 -39 -47 -30 0 -34 3 -34 26 0 29 -35 63 -65 63 -17 0 -16 -3
10 -24 41 -34 23 -32 -26 3 -24 16 -54 52 -76 90 -29 52 -36 75 -39 130 l-3
67 9 -66 c4 -37 16 -81 26 -100 20 -40 66 -99 77 -99 4 0 7 18 7 40 0 38 2 40
30 40 l30 0 0 125 0 125 -30 0 c-23 0 -30 4 -30 20 0 10 -8 24 -17 30 -17 11
-17 11 0 6 11 -3 17 0 17 9 0 14 22 20 63 16 9 -1 17 2 17 8 0 6 -8 8 -17 5
-17 -5 -17 -5 0 9 9 8 17 19 17 25 0 6 -8 9 -17 6 -17 -5 -17 -5 0 9 9 8 17
19 17 25 0 7 12 14 28 18 15 3 35 8 45 11 15 4 17 -4 17 -61 0 -52 -3 -66 -15
-66 -11 0 -15 12 -15 45 0 38 -3 45 -20 45 -17 0 -20 -7 -20 -45 l0 -45 -45 0
c-43 0 -45 -1 -45 -30 0 -28 3 -30 35 -30 l35 0 0 -135 0 -134 -35 -7 c-28 -5
-35 -11 -35 -30 0 -22 4 -24 45 -24 l45 0 0 -40 c0 -33 3 -40 20 -40 17 0 20
7 20 40 0 29 4 40 15 40 12 0 15 -14 15 -65 0 -62 1 -65 25 -65 46 0 125 21
119 32 -4 6 -1 8 7 6 18 -7 69 22 69 39 0 8 12 13 28 13 19 0 40 12 67 40 34
35 41 39 51 25 10 -14 12 -14 19 2 5 10 7 22 6 26 -1 5 6 7 16 5 24 -4 30 -37
6 -34 -17 3 -33 -10 -33 -28 0 -4 7 -6 15 -2 10 3 15 -1 15 -12 0 -13 2 -14 9
-4 4 8 12 14 17 13 5 0 8 12 7 27 l-2 27 13 -24 c11 -20 14 -21 19 -6 10 24 8
33 -2 16 -7 -11 -10 -9 -16 8 -3 11 -11 21 -17 21 -7 0 -7 5 1 14 9 11 6 12
-14 8 -33 -6 -46 25 -20 44 18 13 17 16 -18 52 l-38 38 38 39 c21 22 31 35 23
30 -13 -8 -13 -7 -1 8 14 17 26 24 17 9 -2 -4 4 -13 14 -20 13 -7 21 -8 25 -2
4 6 1 9 -7 8 -8 -2 -12 4 -10 15 2 9 -3 17 -11 17 -7 0 -23 24 -35 53 -32 76
-74 129 -143 181 -66 50 -161 90 -191 80 -19 -6 -18 -8 9 -36 15 -16 49 -41
76 -55 50 -28 59 -45 10 -20 -15 8 -33 13 -38 11 -6 -3 -34 17 -63 43 l-53 48
35 30 35 30 -40 28 -41 28 27 -35z m-45 -86 c0 -5 -4 -10 -10 -10 -5 0 -10 5
-10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m-80 -20 c0 -5 -7 -10 -15 -10 -8 0
-15 5 -15 10 0 6 7 10 15 10 8 0 15 -4 15 -10z m68 -25 c-72 -15 -158 -49
-158 -63 0 -17 13 -22 27 -10 7 6 15 9 18 7 2 -2 -14 -19 -36 -37 -21 -18 -39
-29 -39 -24 0 5 7 15 15 22 13 11 13 15 0 41 -18 34 -19 47 -3 31 8 -8 16 -8
32 0 41 22 132 47 171 47 34 -1 30 -3 -27 -14z m192 5 c0 -5 -4 -10 -10 -10
-5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m-432 -12 c18 -18 15 -75
-4 -82 -25 -10 -39 6 -40 44 0 45 20 62 44 38z m270 -24 c-1 -4 -20 -8 -41
-10 -45 -3 -42 5 5 15 35 8 42 7 36 -5z m62 -4 c0 -5 -5 -10 -11 -10 -5 0 -7
5 -4 10 3 6 8 10 11 10 2 0 4 -4 4 -10z m20 -31 c85 -19 186 -104 204 -169 6
-22 5 -21 -10 5 -24 44 -84 104 -124 125 l-35 18 -3 -44 c-2 -35 1 -46 15 -51
10 -3 28 -15 41 -27 13 -12 27 -21 30 -21 4 0 17 -12 30 -27 14 -16 36 -28 55
-31 32 -4 32 -4 -5 -5 -29 -2 -40 3 -56 25 l-19 26 4 -30 c3 -17 -2 -44 -11
-60 -14 -29 -14 -32 4 -48 11 -10 20 -25 21 -34 0 -10 2 -12 6 -3 2 6 12 12
21 12 12 0 8 8 -14 33 l-29 32 37 -34 c36 -33 43 -56 14 -45 -10 4 -19 -11
-30 -49 -16 -56 -53 -98 -96 -112 -16 -5 -20 -15 -20 -51 0 -44 0 -44 -35 -44
l-35 0 0 50 c0 28 3 50 8 50 4 0 7 -17 7 -37 0 -32 4 -39 23 -41 20 -3 22 1
22 37 0 37 3 42 33 55 75 31 104 128 53 177 l-23 22 19 33 c13 22 17 41 13 56
-10 32 -55 78 -77 78 -15 0 -18 8 -18 50 0 46 -2 50 -24 50 -22 0 -23 -3 -18
-45 3 -30 1 -45 -7 -45 -7 0 -11 19 -11 49 0 47 2 50 28 53 26 3 26 4 -5 9
-32 5 -33 4 -33 -28 0 -19 -4 -32 -8 -29 -9 6 -3 76 7 76 3 0 26 -5 51 -11z
m182 -36 c5 -18 20 -40 33 -49 14 -9 25 -23 25 -31 0 -8 9 -33 20 -55 11 -23
20 -53 20 -66 l0 -25 -19 25 c-12 15 -18 33 -15 45 4 14 -2 29 -18 44 -12 13
-27 37 -33 53 -5 16 -23 37 -39 45 -16 9 -28 20 -27 24 0 4 1 12 1 18 0 6 10
9 22 7 15 -2 24 -13 30 -35z m38 7 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3 6
8 10 11 10 2 0 4 -4 4 -10z m-430 -10 c0 -5 -5 -10 -11 -10 -5 0 -7 5 -4 10 3
6 8 10 11 10 2 0 4 -4 4 -10z m-30 -18 c0 -5 -11 -19 -25 -32 -29 -27 -32 -21
-9 15 16 24 34 33 34 17z m309 -39 c9 -7 11 -13 6 -13 -16 0 -35 22 -34 40 0
13 1 13 6 0 4 -8 13 -20 22 -27z m191 27 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10
10 0 6 5 10 10 10 6 0 10 -4 10 -10z m-460 -5 c0 -2 -10 -10 -22 -16 -21 -11
-22 -11 -9 4 13 16 31 23 31 12z m329 -39 c38 -41 20 -35 -24 8 -22 21 -31 34
-20 28 11 -6 31 -22 44 -36z m-447 19 c0 -5 -5 -11 -11 -13 -6 -2 -11 4 -11
13 0 9 5 15 11 13 6 -2 11 -8 11 -13z m-42 -65 c-44 -86 -43 -238 2 -279 11
-11 17 -24 13 -30 -7 -12 -35 -15 -36 -3 -1 12 -7 43 -23 127 -9 50 -11 84 -5
89 5 6 9 16 9 24 0 21 42 112 51 112 5 0 0 -18 -11 -40z m64 1 c-8 -9 -22 12
-17 26 6 15 7 14 13 -3 4 -10 6 -21 4 -23z m-134 -1 c0 -5 -4 -10 -10 -10 -5
0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m148 -32 c-17 -33 -22 -60
-23 -115 0 -50 -3 -65 -8 -50 -5 12 -6 46 -4 75 5 49 4 52 -17 52 -19 0 -22 4
-18 30 2 17 8 30 13 30 5 0 7 -11 3 -25 -10 -41 29 -33 49 10 9 19 19 35 22
35 3 0 -5 -19 -17 -42z m457 22 c3 -5 1 -10 -4 -10 -6 0 -11 5 -11 10 0 6 2
10 4 10 3 0 8 -4 11 -10z m135 -10 c0 -5 -4 -10 -10 -10 -5 0 -10 5 -10 10 0
6 5 10 10 10 6 0 10 -4 10 -10z m-289 -10 c11 -6 19 -21 19 -35 0 -39 -25 -55
-86 -55 l-54 0 0 50 0 50 51 0 c28 0 59 -5 70 -10z m-264 -67 c-3 -10 -5 -2
-5 17 0 19 2 27 5 18 2 -10 2 -26 0 -35z m-197 17 c0 -5 -4 -10 -10 -10 -5 0
-10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m167 -47 c-3 -10 -5 -2 -5 17
0 19 2 27 5 18 2 -10 2 -26 0 -35z m531 -41 c12 1 20 -1 19 -7 -2 -12 -47 -7
-65 8 -7 5 -27 29 -44 51 l-31 41 50 -48 c34 -33 57 -48 71 -45z m-507 -97
c-5 -11 -12 -29 -14 -40 -3 -13 -5 -9 -6 11 0 16 4 35 10 41 6 6 9 19 7 29 -4
16 -7 15 -18 -8 -7 -16 -17 -28 -21 -28 -5 0 0 13 9 30 9 16 20 30 25 30 4 0
8 19 9 43 1 28 3 21 5 -23 2 -35 0 -73 -6 -85z m-86 125 c3 -5 1 -10 -4 -10
-6 0 -11 5 -11 10 0 6 2 10 4 10 3 0 8 -4 11 -10z m135 -30 c0 -5 -4 -10 -10
-10 -5 0 -10 5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z m238 -16 c14 -10 22
-26 22 -44 0 -41 -32 -60 -102 -60 l-58 0 0 60 0 60 58 0 c36 0 66 -6 80 -16z
m-484 -15 c-3 -5 -10 -7 -15 -3 -5 3 -7 10 -3 15 3 5 10 7 15 3 5 -3 7 -10 3
-15z m686 -25 c0 -2 -18 -4 -40 -4 -22 0 -40 3 -40 8 0 4 18 6 40 4 22 -2 40
-6 40 -8z m45 5 c4 -5 0 -18 -8 -27 -8 -9 -22 -34 -32 -54 -16 -34 -21 -38
-54 -36 l-36 1 33 4 c35 5 62 42 62 86 0 34 21 50 35 26z m-697 -57 c3 -18 -1
-22 -22 -22 -19 0 -26 5 -26 18 0 39 43 43 48 4z m642 18 c0 -6 -13 -13 -28
-16 -16 -3 -41 -21 -57 -42 -18 -22 -23 -33 -13 -29 10 3 24 -3 34 -14 16 -17
16 -19 1 -13 -9 3 -28 -3 -44 -13 -39 -27 -53 -35 -53 -29 0 2 16 14 36 27 30
18 33 24 20 31 -10 5 -25 5 -38 -2 -20 -9 -20 -8 2 7 14 10 38 33 54 50 16 18
38 33 48 33 10 0 18 5 18 10 0 6 5 10 10 10 6 0 10 -5 10 -10z m-505 -130 c6
0 19 -13 30 -28 l19 -26 -29 22 c-44 32 -58 45 -80 72 -13 17 -8 14 16 -7 19
-18 39 -33 44 -33z m222 -52 c-2 -13 -4 -3 -4 22 0 25 2 35 4 23 2 -13 2 -33
0 -45z m-82 -30 c7 -7 1 -8 -15 -3 -40 12 -59 26 -25 19 17 -4 35 -11 40 -16z"
      />
      <path
        d="M240 899 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10
-5 -10 -11z"
      />
      <path
        d="M240 870 c0 -5 5 -10 10 -10 6 0 10 5 10 10 0 6 -4 10 -10 10 -5 0
-10 -4 -10 -10z"
      />
      <path
        d="M520 665 c0 -12 14 -15 62 -15 34 0 58 3 54 7 -3 4 -30 6 -59 6 l-52
-1 45 8 45 7 -47 1 c-37 2 -48 -2 -48 -13z"
      />
      <path
        d="M520 630 c0 -5 24 -10 54 -10 30 0 58 5 61 10 4 6 -17 10 -54 10 -34
0 -61 -4 -61 -10z"
      />
      <path d="M543 603 c15 -2 37 -2 50 0 12 2 0 4 -28 4 -27 0 -38 -2 -22 -4z" />
      <path d="M543 523 c15 -2 39 -2 55 0 15 2 2 4 -28 4 -30 0 -43 -2 -27 -4z" />
      <path
        d="M520 490 c0 -18 6 -20 71 -20 62 0 70 2 67 18 -3 14 -16 18 -71 20
-62 3 -67 1 -67 -18z"
      />
      <path
        d="M560 450 l45 -6 -45 -5 -45 -6 51 -1 c31 -1 58 4 70 13 17 13 13 14
-51 13 -64 -1 -66 -2 -25 -8z"
      />
      <path
        d="M480 1080 c11 -9 12 -13 3 -17 -22 -8 -14 -23 13 -23 25 0 26 1 12
22 -8 12 -21 24 -29 26 -11 3 -11 1 1 -8z"
      />
      <path d="M254 1048 l-19 -23 23 19 c21 18 27 26 19 26 -2 0 -12 -10 -23 -22z" />
      <path
        d="M635 1030 c-3 -5 -1 -10 4 -10 6 0 11 5 11 10 0 6 -2 10 -4 10 -3 0
-8 -4 -11 -10z"
      />
      <path d="M355 1010 c-3 -6 1 -7 9 -4 18 7 21 14 7 14 -6 0 -13 -4 -16 -10z" />
      <path d="M800 946 c0 -2 8 -10 18 -17 15 -13 16 -12 3 4 -13 16 -21 21 -21 13z" />
      <path
        d="M482 853 c24 -4 27 -9 31 -51 l3 -47 2 53 2 52 -32 -1 c-30 -2 -30
-2 -6 -6z"
      />
      <path
        d="M113 833 c9 -2 17 -9 17 -14 0 -19 -30 -68 -51 -83 -22 -15 -22 -15
-2 -13 14 1 29 18 47 55 17 33 31 50 38 46 7 -4 8 -3 4 4 -4 7 -22 11 -39 11
-18 -1 -24 -3 -14 -6z"
      />
      <path d="M1023 815 c0 -8 4 -12 9 -9 5 3 6 10 3 15 -9 13 -12 11 -12 -6z" />
      <path
        d="M1200 559 l0 -211 104 4 c150 4 146 0 146 199 0 86 -3 165 -6 174
-12 31 -59 45 -154 45 l-90 0 0 -211z m140 7 c0 -110 -3 -135 -15 -140 -13 -5
-15 14 -15 134 0 118 2 140 15 140 13 0 15 -22 15 -134z"
      />
      <path
        d="M1760 560 l0 -210 55 0 55 0 0 84 0 83 46 6 c62 7 77 24 82 96 5 72
-2 105 -28 131 -17 17 -34 20 -115 20 l-95 0 0 -210z m146 114 c8 -31 -5 -75
-23 -82 -10 -3 -13 12 -13 52 0 43 3 56 15 56 8 0 18 -12 21 -26z"
      />
      <path
        d="M1535 688 c-33 -18 -45 -40 -45 -85 l0 -43 45 0 c42 0 45 2 45 28 0
34 14 57 29 48 12 -8 15 -45 3 -62 -4 -6 -33 -22 -64 -37 l-58 -26 0 -65 c0
-45 5 -69 16 -80 18 -19 85 -21 102 -4 9 9 12 9 12 0 0 -8 18 -12 50 -12 l50
0 0 148 c-1 153 -4 168 -47 190 -27 15 -111 15 -138 0z m85 -228 c0 -37 -4
-50 -15 -50 -20 0 -28 40 -16 73 16 43 31 32 31 -23z"
      />
      <path
        d="M2055 677 c-20 -17 -28 -35 -32 -70 l-6 -47 52 0 51 0 0 40 c0 29 4
40 15 40 11 0 15 -11 15 -36 0 -33 -3 -37 -54 -59 -30 -13 -60 -34 -67 -46
-14 -26 -7 -112 11 -134 15 -18 81 -20 99 -2 11 10 14 10 18 0 3 -8 24 -13 55
-13 l49 0 -3 151 -3 151 -28 24 c-40 34 -134 35 -172 1z m95 -217 c0 -38 -4
-50 -15 -50 -19 0 -21 70 -3 88 18 18 18 17 18 -38z"
      />
      <path
        d="M2276 683 c2 -10 15 -76 29 -148 14 -72 27 -138 30 -149 2 -12 -3
-20 -16 -23 -13 -4 -19 -14 -19 -35 l0 -30 65 4 c98 6 103 15 126 190 10 78
18 158 19 176 0 31 -1 32 -44 32 l-43 0 -7 -52 c-3 -29 -6 -75 -6 -103 -1 -63
-15 -42 -24 35 -15 125 -12 120 -66 120 -41 0 -48 -3 -44 -17z"
      />
      <path
        d="M56 625 c4 -8 8 -15 10 -15 2 0 4 7 4 15 0 8 -4 15 -10 15 -5 0 -7
-7 -4 -15z"
      />
      <path
        d="M981 613 c-1 -7 -11 -13 -23 -13 -18 0 -23 -6 -23 -25 0 -19 5 -25
22 -25 12 0 24 -6 26 -12 4 -10 6 -10 6 0 1 6 11 12 24 12 17 0 22 6 22 25 0
19 -5 25 -22 25 -12 0 -24 6 -26 13 -4 10 -6 10 -6 0z m29 -38 c0 -9 -9 -15
-25 -15 -16 0 -25 6 -25 15 0 9 9 15 25 15 16 0 25 -6 25 -15z"
      />
      <path
        d="M51 576 c-27 -28 -28 -45 -1 -21 19 17 20 17 21 -1 0 -11 3 -14 6 -6
4 10 8 10 19 1 24 -20 24 -6 -1 23 l-23 27 -21 -23z"
      />
      <path
        d="M1035 520 c-10 -11 -25 -19 -33 -18 -8 2 -17 -2 -19 -9 -7 -19 33 -3
58 23 12 13 20 24 17 24 -3 0 -13 -9 -23 -20z"
      />
      <path
        d="M24 513 c20 -24 46 -31 46 -12 0 5 -5 7 -11 4 -5 -4 -20 1 -32 12
l-22 18 19 -22z"
      />
      <path
        d="M851 346 c-24 -24 -44 -36 -62 -36 l-28 0 19 -42 c21 -47 27 -87 8
-53 -6 11 -12 21 -13 23 -4 5 -93 -49 -105 -63 -9 -11 -17 -12 -30 -5 -10 5
-33 7 -50 3 l-32 -6 29 -23 c37 -31 56 -30 131 6 64 30 94 32 71 4 -10 -12
-10 -15 2 -12 8 2 17 12 21 23 4 15 6 11 7 -15 l1 -34 68 67 c37 37 70 65 73
62 3 -2 18 9 34 25 16 16 27 31 24 34 -10 8 -89 13 -83 5 3 -5 21 -9 40 -9 19
0 33 -4 30 -8 -2 -4 -22 -6 -43 -4 -34 3 -40 8 -58 49 l-20 44 -34 -35z m35
-101 c-3 -9 -14 -15 -23 -13 -22 4 -30 38 -11 49 18 11 43 -15 34 -36z m104
31 c0 -2 -8 -10 -17 -17 -16 -13 -17 -12 -4 4 13 16 21 21 21 13z"
      />
      <path
        d="M415 340 c3 -5 10 -10 16 -10 5 0 9 5 9 10 0 6 -7 10 -16 10 -8 0
-12 -4 -9 -10z"
      />
      <path
        d="M178 318 c-27 -22 -30 -53 -7 -81 40 -52 107 -19 100 50 -3 36 -61
55 -93 31z m62 -37 c11 -39 0 -61 -28 -56 -9 2 -21 4 -26 4 -6 1 -5 6 2 13 15
15 16 48 1 48 -8 0 -8 4 0 13 19 24 41 15 51 -22z"
      />
      <path
        d="M210 249 c0 -5 5 -7 10 -4 6 3 10 8 10 11 0 2 -4 4 -10 4 -5 0 -10
-5 -10 -11z"
      />
      <path d="M122 270 c0 -19 2 -27 5 -17 2 9 2 25 0 35 -3 9 -5 1 -5 -18z" />
      <path
        d="M289 235 l-15 -33 50 -30 c63 -37 114 -54 190 -61 72 -7 89 -30 24
-33 l-43 -1 38 -4 c25 -3 35 -8 31 -16 -3 -7 2 -3 11 8 9 11 18 19 20 18 3 -2
10 -3 16 -3 6 0 -9 16 -33 36 -23 20 -46 41 -49 46 -3 5 -37 16 -75 25 -47 11
-82 26 -109 48 l-40 33 -16 -33z m51 -31 c0 -8 -4 -12 -10 -9 -5 3 -10 10 -10
16 0 5 5 9 10 9 6 0 10 -7 10 -16z m84 -45 c-3 -5 -10 -7 -15 -3 -5 3 -7 10
-3 15 3 5 10 7 15 3 5 -3 7 -10 3 -15z m66 -9 c0 -5 -4 -10 -10 -10 -5 0 -10
5 -10 10 0 6 5 10 10 10 6 0 10 -4 10 -10z"
      />
      <path d="M130 226 c0 -2 8 -10 18 -17 15 -13 16 -12 3 4 -13 16 -21 21 -21 13z" />
      <path
        d="M216 183 c25 -3 49 -12 59 -24 10 -10 23 -19 29 -19 6 0 -2 11 -19
25 -22 18 -41 24 -70 23 l-40 -1 41 -4z"
      />
      <path d="M855 128 l-50 -53 53 50 c48 46 57 55 49 55 -1 0 -25 -24 -52 -52z" />
      <path d="M256 132 c-2 -4 4 -8 14 -8 10 0 16 4 14 8 -7 10 -21 10 -28 0z" />
      <path d="M327 129 c7 -7 15 -10 18 -7 3 3 -2 9 -12 12 -14 6 -15 5 -6 -5z" />
      <path
        d="M700 110 c-8 -5 -10 -10 -5 -10 6 0 17 5 25 10 8 5 11 10 5 10 -5 0
-17 -5 -25 -10z"
      />
      <path d="M658 93 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z" />
    </g>
  </svg>
);

export default Logo;
