@props(['url'])
<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'VetiVet' || trim($slot) === 'Laravel')
<div style="font-size: 28px; font-weight: bold; color: #7C3AED; font-family: 'Arial', sans-serif;">
    🐾 VetiVet
</div>
@else
{!! $slot !!}
@endif
</a>
</td>
</tr>
