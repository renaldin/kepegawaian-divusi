<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ $fileName }}</title>

  <style>
    * {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 9pt;
    }

    table {
      width: 100%;
      font: 9pt arial, sans-serif;
      color: black;
      border: 1px solid black;
      border-collapse: collapse;
    }

    th {
      /* height: 70px; */
      padding: 3px;
      background-color: rgb(238, 238, 238);
      border: 1px solid black;
    }

    td {
      padding: 5px;
      border: 1px solid black;
      /* height: 70px; */
    }
  </style>
</head>

<body>
  <div style="margin-bottom: 10px">
    <span style="font-family: 'Courier New', monospace;font-size: 8pt;">
      dicetak pada: {{ date('d F Y') }}
    </span>
  </div>

  <div style="text-align: center;">
    <span style="font-size: 12pt;font-weight: bold;">
      Laporan Presensi
    </span>
    <br>
    <span style="font-size: 11pt;">
      Periode: {{ $periode }}
    </span>

    <hr style="border-top: 3px double #8c8b8b">
  </div>

  <table cellspacing='0'>
    <thead>
      <tr>
        <th>No</th>
        <th>NIP</th>
        <th>Nama Karyawan</th>
        <th>Fungsional</th>
        <th>Struktural</th>
        <th>Hadir</th>
        <th>Sakit</th>
        <th>Izin</th>
        <th>Alpa</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      @forelse ($presensi as $item)
      <tr>
        <td>
          {{ $loop->iteration }}
        </td>
        <td>
          {{ $item['nip'] }}
        </td>
        <td>
          {{ $item['nama_karyawan'] }}
        </td>
        <td>
          {{$item['nama_fungsional']}}
        </td>
        <td>
          {{ $item['nama_struktural'] }}
        </td>
        <td>
          {{ $item['hadir'] }}
        </td>
        <td>
          {{ $item['sakit'] }}
        </td>
        <td>
          {{ $item['izin'] }}
        </td>
        <td>
          {{ $item['alpa'] }}
        </td>
        <td>
          {{ $item['total'] }}
        </td>
      </tr>
      @empty
      <tr>
        <td colspan="9">tidak ada data. . .</td>
      </tr>
      @endforelse
    </tbody>
  </table>

</body>

</html>